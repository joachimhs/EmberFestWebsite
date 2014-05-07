package no.haagensoftware.kontize.handler;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;
import no.haagensoftware.contentice.data.SubCategoryData;
import no.haagensoftware.contentice.handler.ContenticeHandler;
import no.haagensoftware.kontize.db.dao.TicketsDao;
import no.haagensoftware.kontize.models.*;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.log4j.Logger;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.ArrayList;
import java.util.UUID;

/**
 * Created by jhsmbp on 1/28/14.
 */
public class TicketSubtotalHandler extends ContenticeHandler {
    private static final Logger logger = Logger.getLogger(TicketSubtotalHandler.class.getName());
    private AuthenticationContext authenticationContext = null;
    private TicketsDao ticketsDao = null;

    private String continueUrl = System.getProperty("eu.emberfest.ticket.continueurl");
    private String cancelUrl = System.getProperty("eu.emberfest.ticket.cancelurl");
    private String callbackUrl = System.getProperty("eu.emberfest.ticket.callbackurl");
    private String md5Secret = System.getProperty("eu.emberfest.ticket.md5secret");
    private String ticketsTest = System.getProperty("eu.emberfest.ticket.test", "0");

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, FullHttpRequest fullHttpRequest) throws Exception {
        if (authenticationContext == null) {
            authenticationContext = AuthenticationContext.getInstance(getStorage());
        }

        if (ticketsDao == null) {
            ticketsDao = new TicketsDao(getStorage());
        }

        boolean isUser = false;
        JsonObject jsonReturn = new JsonObject();

        String cookieUuidToken = getCookieValue(fullHttpRequest, "uuidToken");

        logger.info("uuidToken: " + cookieUuidToken);

        AuthenticationResult cachedUserResult = null;
        if (cookieUuidToken != null) {
            cachedUserResult = authenticationContext.verifyUUidToken(getDomain().getWebappName(), cookieUuidToken);
            logger.info("cachedUserResult: " + cachedUserResult);
        }

        if (cachedUserResult != null) {
            isUser = authenticationContext.isUser(getDomain().getWebappName(), cachedUserResult.getUuidToken(), cachedUserResult.getUserId());
        }

        String messageContent = getHttpMessageContent(fullHttpRequest);
        logger.info(messageContent);

        List<TicketType> ticketTypes = new ArrayList<>();


        if (isUser && isPost(fullHttpRequest) && messageContent.length() >= 3) {
            Order order = new Gson().fromJson(messageContent, Order.class);

            long subtotalNonDiscountable = 0l;
            long subtotalDiscountable = 0l;
            long discount = 0l;
            List<Ticket> validTickets = new ArrayList<>();
            if (order != null && order.getTickets().size() > 0) {
                for (Ticket ticket : order.getTickets()) {
                    SubCategoryData subCategoryData = getStorage().getSubCategory(getDomain().getWebappName(), "ticketTypes", ticket.getType());
                    if (subCategoryData != null) {
                        TicketType ticketType = TicketsDao.convertSubcategoryToTicketType(subCategoryData);
                        if (ticketType != null && ticketType.getTicketsAvailable() > 0) {
                            ticketTypes.add(ticketType);

                            if (ticketType.getDiscountable() == null || !ticketType.getDiscountable().booleanValue()) {
                                subtotalNonDiscountable += ticketTypes.get(ticketTypes.size() - 1).getPrice();
                            } else {
                                subtotalDiscountable += ticketTypes.get(ticketTypes.size() - 1).getPrice();
                            }

                            validTickets.add(ticket);
                        }
                    }
                }
            }

            if (order.getCouponCode() == null || order.getCouponCode().equals("")) {
                order.setCouponCode("");
                discount = 0;
            } else {
                SubCategoryData subCategoryData = getStorage().getSubCategory(getDomain().getWebappName(), "coupons", order.getCouponCode());
                if (subCategoryData != null) {
                    CouponCode couponCode = TicketsDao.convertSubcategoryToCouponCode(subCategoryData);

                    if (couponCode.isValid()) {
                        discount = (long)(subtotalDiscountable * ((couponCode.getDiscountAmount()) / 100d));
                    }
                }
            }

            order.setTickets(validTickets);

            long subtotal = (subtotalDiscountable + subtotalNonDiscountable) * 100;
            discount *= 100;

            order.setSubtotal(subtotal);
            order.setCouponDiscount(discount);

            if (order.getOrderNumber() == null || order.getOrderNumber().length() < 10) {
                order.setOrderNumber(UUID.randomUUID().toString().replaceAll("-", "").substring(0, 20));
            }


            List<Ticket> tickets = new ArrayList<>();
            for (TicketType tt : ticketTypes) {
                Ticket ticket = new Ticket();

                if (tt.getId().startsWith("ticketTypes_")) {
                    ticket.setType(tt.getId().substring(12));
                } else {
                    ticket.setType(tt.getId());
                }
                ticket.setName(tt.getName());
                ticket.setPrice(tt.getPrice());

                tickets.add(ticket);
            }

            jsonReturn = buildJsonReturn(tickets, order);

            order.setStatus("new");
            order.setUserId(cachedUserResult.getUserId());

            ticketsDao.storeOrder(getDomain().getWebappName(), order);
        } else if (isUser && isGet(fullHttpRequest)) {
            logger.info("Getting basket for: " + cachedUserResult.getUserId());
            Order existingOrder = ticketsDao.getNewOrderForUser(getDomain().getWebappName(), cachedUserResult.getUserId());
            logger.info("Got order: " + existingOrder);

            if (existingOrder != null) {
                logger.info("Got order: " + existingOrder.getStatus());

                jsonReturn = buildJsonReturn(existingOrder.getTickets(), existingOrder);
            }
        }

        writeContentsToBuffer(channelHandlerContext, jsonReturn.toString(), "application/json");
    }

    private JsonObject buildJsonReturn(List<Ticket> tickets, Order order) {
        JsonObject jsonReturn = new JsonObject();
        jsonReturn.addProperty("numTickets", tickets.size());

        long subtotal = 0l;
        if (order.getCouponDiscount() == null) {
            subtotal = order.getSubtotal();
            jsonReturn.addProperty("discount", 0);
        } else {
            subtotal = order.getSubtotal() - order.getCouponDiscount();
            jsonReturn.addProperty("discount", order.getCouponDiscount());
        }

        jsonReturn.addProperty("subtotal", subtotal);

        if (order.getCouponDiscount() != null) {
            jsonReturn.addProperty("couponCode", order.getCouponCode());
        }

        jsonReturn.addProperty("md5Hash", calculateMD5(subtotal, order.getOrderNumber(), ticketsTest));
        jsonReturn.addProperty("orderNumber", order.getOrderNumber());
        if (ticketsTest.equals("1")) {
            jsonReturn.addProperty("testmode", ticketsTest);
        }
        jsonReturn.addProperty("continueUrl", continueUrl);
        jsonReturn.addProperty("cancelUrl", cancelUrl);
        jsonReturn.addProperty("callbackUrl", callbackUrl);

        JsonArray basketTickets = new JsonArray();
        for (Ticket ticket : tickets) {
            basketTickets.add(new Gson().toJsonTree(ticket));
        }

        jsonReturn.add("basket", basketTickets);

        return jsonReturn;
    }

    private String calculateMD5(long subtotal, String orderNumber, String testmode) {
        StringBuffer sb = new StringBuffer();
        sb.append("7");
        sb.append("authorize");
        sb.append("99839257");
        sb.append("en");
        sb.append(orderNumber);
        sb.append("" + subtotal);
        sb.append("EUR");
        sb.append(continueUrl);
        sb.append(cancelUrl);
        sb.append(callbackUrl);
        sb.append("0");
        sb.append("");
        if (testmode.equals("1")) {
            sb.append("1");
        }
        sb.append("1");
        sb.append(md5Secret);


        String md5Hash = DigestUtils.md5Hex(sb.toString());

        logger.info("MD5Hash: " + md5Hash);

        return md5Hash;
    }

}
