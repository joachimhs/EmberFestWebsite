package no.haagensoftware.kontize.handler;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;
import no.haagensoftware.contentice.data.SubCategoryData;
import no.haagensoftware.contentice.handler.ContenticeHandler;
import no.haagensoftware.kontize.db.dao.TicketsDao;
import no.haagensoftware.kontize.models.AuthenticationResult;
import no.haagensoftware.kontize.models.Order;
import no.haagensoftware.kontize.models.Ticket;
import no.haagensoftware.kontize.models.TicketType;
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
            cachedUserResult = authenticationContext.verifyUUidToken(cookieUuidToken);
            logger.info("cachedUserResult: " + cachedUserResult);
        }

        if (cachedUserResult != null) {
            isUser = authenticationContext.isUser(cachedUserResult.getUuidToken(), cachedUserResult.getUserId());
        }

        String messageContent = getHttpMessageContent(fullHttpRequest);
        logger.info(messageContent);

        List<TicketType> ticketTypes = new ArrayList<>();


        if (isUser && isPost(fullHttpRequest) && messageContent.length() >= 3) {
            Order order = new Gson().fromJson(messageContent, Order.class);

            long subtotal = 0l;
            List<Ticket> validTickets = new ArrayList<>();
            if (order != null && order.getTickets().size() > 0) {
                for (Ticket ticket : order.getTickets()) {
                    SubCategoryData subCategoryData = getStorage().getSubCategory("ticketTypes", ticket.getType());
                    if (subCategoryData != null) {
                        TicketType ticketType = TicketsDao.convertSubcategoryToTicketType(subCategoryData);
                        if (ticketType != null && ticketType.getTicketsAvailable() > 0) {
                            ticketTypes.add(ticketType);
                            subtotal += ticketTypes.get(ticketTypes.size() - 1).getPrice();

                            validTickets.add(ticket);
                        }
                    }
                }
            }

            order.setTickets(validTickets);

            subtotal *= 100;

            if (order.getOrderNumber() == null || order.getOrderNumber().length() < 10) {
                order.setOrderNumber(UUID.randomUUID().toString().replaceAll("-", "").substring(0, 20));
            }

            jsonReturn.addProperty("numTickets", ticketTypes.size());
            jsonReturn.addProperty("subtotal", subtotal);
            jsonReturn.addProperty("md5Hash", calculateMD5(subtotal, order.getOrderNumber()));
            jsonReturn.addProperty("orderNumber", order.getOrderNumber());
            jsonReturn.addProperty("continueUrl", continueUrl);
            jsonReturn.addProperty("cancelUrl", cancelUrl);
            jsonReturn.addProperty("callbackUrl", callbackUrl);

            JsonArray purchasedTicketsArray = new JsonArray();
            for (TicketType tt : ticketTypes) {
                JsonObject ticket = new JsonObject();
                if (tt.getId().startsWith("ticketTypes_")) {
                    ticket.addProperty("type", tt.getId().substring(12));
                } else {
                    ticket.addProperty("type", tt.getId());
                }
                ticket.addProperty("name", tt.getName());
                ticket.addProperty("price", tt.getPrice());

                purchasedTicketsArray.add(ticket);
            }

            jsonReturn.add("basket", purchasedTicketsArray);

            order.setStatus("new");
            order.setSubtotal(subtotal);
            order.setUserId(cachedUserResult.getUserId());

            ticketsDao.storeOrder(order);
        } else if (isUser && isGet(fullHttpRequest)) {
            logger.info("Getting basket for: " + cachedUserResult.getUserId());
            Order existingOrder = ticketsDao.getNewOrderForUser(cachedUserResult.getUserId());
            logger.info("Got order: " + existingOrder);

            if (existingOrder != null) {
                logger.info("Got order: " + existingOrder.getStatus());

                jsonReturn.addProperty("numTickets", existingOrder.getTickets().size());
                jsonReturn.addProperty("subtotal", existingOrder.getSubtotal());
                jsonReturn.addProperty("md5Hash", calculateMD5(existingOrder.getSubtotal(), existingOrder.getOrderNumber()));
                jsonReturn.addProperty("orderNumber", existingOrder.getOrderNumber());
                jsonReturn.addProperty("continueUrl", continueUrl);
                jsonReturn.addProperty("cancelUrl", cancelUrl);
                jsonReturn.addProperty("callbackUrl", callbackUrl);

                JsonArray basketTickets = new JsonArray();
                for (Ticket ticket : existingOrder.getTickets()) {
                    basketTickets.add(new Gson().toJsonTree(ticket));
                }

                jsonReturn.add("basket", basketTickets);
            }
        }

        writeContentsToBuffer(channelHandlerContext, jsonReturn.toString(), "application/json");
    }

    private String calculateMD5(long subtotal, String orderNumber) {
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
        sb.append("1");
        sb.append(md5Secret);


        String md5Hash = DigestUtils.md5Hex(sb.toString());

        logger.info("MD5Hash: " + md5Hash);

        return md5Hash;
    }

}
