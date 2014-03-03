package no.haagensoftware.kontize.handler;

import com.google.gson.JsonArray;
import com.google.gson.JsonPrimitive;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.multipart.Attribute;
import io.netty.handler.codec.http.multipart.DefaultHttpDataFactory;
import io.netty.handler.codec.http.multipart.HttpPostRequestDecoder;
import io.netty.handler.codec.http.multipart.InterfaceHttpData;
import no.haagensoftware.contentice.data.SubCategoryData;
import no.haagensoftware.contentice.handler.ContenticeHandler;
import no.haagensoftware.kontize.db.dao.TicketsDao;
import no.haagensoftware.kontize.models.Ticket;
import no.haagensoftware.kontize.models.TicketType;
import no.haagensoftware.kontize.quickpay.QuickpayStatus;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.fileupload.MultipartStream;
import org.apache.log4j.Logger;

import java.io.*;
import java.util.*;

/**
 * Created by jhsmbp on 1/28/14.
 */
public class TicketsCallbackHandler extends ContenticeHandler {
    private static final Logger logger = Logger.getLogger(TicketsCallbackHandler.class.getName());

    private String md5Secret = System.getProperty("eu.emberfest.ticket.md5secret");

    private TicketsDao ticketsDao = null;

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, FullHttpRequest fullHttpRequest) throws Exception {
        Map<String, String> formMap = new HashMap<>();

        String messageContent = getHttpMessageContent(fullHttpRequest);
        String contentType = getContentType(fullHttpRequest);

        int boundaryIndex = contentType.indexOf("boundary=");
        byte[] boundary = contentType.substring((boundaryIndex + 9)).getBytes();

        logger.info("boundary: " + contentType.substring((boundaryIndex + 9)));

        ByteArrayInputStream content = new ByteArrayInputStream(messageContent.getBytes());
        MultipartStream multipartStream = new MultipartStream(content, boundary);

        boolean nextPart = multipartStream.skipPreamble();
        while (nextPart) {
            String key = null;
            String value = null;

            String header = multipartStream.readHeaders();

            if (header.contains("name=")) {
                key = header.substring((header.indexOf("name=") + 6), header.length() - 2).trim();
                if (key.contains("\"")) {
                    key = key.replaceAll("\"", "");
                }
            }

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            multipartStream.readBodyData(outputStream);

            value = new String(outputStream.toByteArray()).trim();

            logger.info("key: '" + key + "' value: '" + value + "'");

            formMap.put(key, value);

            nextPart = multipartStream.readBoundary();
        }

        if (validateMd5(formMap)) {
            logger.info("MD5 check successful!");
            SubCategoryData order = null;

            String qpOrdernumber = formMap.get("ordernumber");
            if (qpOrdernumber != null) {
                order = getStorage().getSubCategory("orders", qpOrdernumber);
                if (order != null) {
                    order.getKeyMap().put("qpOrdernumber", new JsonPrimitive(qpOrdernumber));
                }
            }

            for (String key : formMap.keySet()) {
                String value = formMap.get(key);
                order.getKeyMap().put(key, new JsonPrimitive(value));
            }

            QuickpayStatus quickpayStatus = QuickpayStatus.fromString(formMap.get("qpstat"));

            if (quickpayStatus != null) {
                order.getKeyMap().put("status", new JsonPrimitive(quickpayStatus.toString()));

                if (quickpayStatus == QuickpayStatus.approved) {
                    //Create tickets
                    logger.info("Creating tickets!");
                    List<String> ticketIds = createTickets(order.getValueForKey("userId"), qpOrdernumber, order.getListForKey("tickets", ","));
                    JsonArray ticketIdsArray = new JsonArray();
                    for (String ticketId : ticketIds) {
                        ticketIdsArray.add(new JsonPrimitive(ticketId));
                    }
                    order.getKeyMap().put("ticketIds", ticketIdsArray);
                }
            } else {
                order.getKeyMap().put("status", new JsonPrimitive("unknown status code: " + formMap.get("qpstat")));
            }

            getStorage().setSubCategory("orders", qpOrdernumber, order);
        } else {
            logger.info("MD5 check failed!");
            SubCategoryData order = null;

            String qpOrdernumber = formMap.get("ordernumber");
            if (qpOrdernumber != null) {
                order = getStorage().getSubCategory("orders", qpOrdernumber);
                if (order != null) {
                    order.getKeyMap().put("qpOrdernumber", new JsonPrimitive(qpOrdernumber));
                }
            }

            order.getKeyMap().put("status", new JsonPrimitive("md5checkfailed"));

            getStorage().setSubCategory("orders", qpOrdernumber, order);
        }

        writeContentsToBuffer(channelHandlerContext, "", "text/plain; charset=UTF-8");
    }

    private List<String> createTickets(String userId, String ordernumber, List<String> ticketTypes) {
        List<String> ticketIds = new ArrayList<>();

        logger.info("Creating " + ticketTypes.size() + " tickets for: " + userId + " with order number: " + ordernumber);

        if (ticketTypes != null && userId != null && ordernumber != null) {
            for (String ticketType : ticketTypes) {
                logger.info("\tCreating ticket: " + ticketType);

                String ticketId = UUID.randomUUID().toString();

                SubCategoryData ticket = new SubCategoryData();
                ticket.setId(userId + "-" + ticketId);
                ticket.getKeyMap().put("ticketId", new JsonPrimitive(ticketId));
                ticket.getKeyMap().put("userId", new JsonPrimitive(userId));
                ticket.getKeyMap().put("ordernumber", new JsonPrimitive(ordernumber));
                ticket.getKeyMap().put("ticketType", new JsonPrimitive(ticketType));

                logger.info("\tPersisting ticket: " + ticketType);

                getStorage().setSubCategory("tickets", ticket.getId(), ticket);

                ticketIds.add(ticket.getId());
            }

            tickdownAvailableTickets(ticketTypes);
        }

        return ticketIds;
    }

    private void tickdownAvailableTickets(List<String> ticketTypes) {
        if (ticketsDao == null) {
            ticketsDao = new TicketsDao(getStorage());
        }

        for (String type : ticketTypes) {
            TicketType ticketType = ticketsDao.getTicketType(type);
            ticketType.setTicketsAvailable(ticketType.getTicketsAvailable() - 1);
            ticketsDao.storeTicketType(ticketType);
        }
    }

    private String getFromMapOrEmptyString(Map<String, String> formMap, String key) {
        String retVal = "";

        if (formMap.get(key) != null) {
            retVal = formMap.get(key);
        }

        return retVal;
    }

    private boolean validateMd5(Map<String, String> formMap) {
        StringBuffer sb = new StringBuffer();
        sb.append(getFromMapOrEmptyString(formMap, "msgtype"));
        sb.append(getFromMapOrEmptyString(formMap, "ordernumber"));
        sb.append(getFromMapOrEmptyString(formMap, "amount"));
        sb.append(getFromMapOrEmptyString(formMap, "currency"));
        sb.append(getFromMapOrEmptyString(formMap, "time"));
        sb.append(getFromMapOrEmptyString(formMap, "state"));
        sb.append(getFromMapOrEmptyString(formMap, "qpstat"));
        sb.append(getFromMapOrEmptyString(formMap, "qpstatmsg"));
        sb.append(getFromMapOrEmptyString(formMap, "chstat"));
        sb.append(getFromMapOrEmptyString(formMap, "chstatmsg"));
        sb.append(getFromMapOrEmptyString(formMap, "merchant"));
        sb.append(getFromMapOrEmptyString(formMap, "merchantemail"));
        sb.append(getFromMapOrEmptyString(formMap, "transaction"));
        sb.append(getFromMapOrEmptyString(formMap, "cardtype"));
        sb.append(getFromMapOrEmptyString(formMap, "cardnumber"));
        sb.append(getFromMapOrEmptyString(formMap, "cardhash"));
        sb.append(getFromMapOrEmptyString(formMap, "cardexpire"));
        sb.append(getFromMapOrEmptyString(formMap, "acquirer"));
        sb.append(getFromMapOrEmptyString(formMap, "splitpayment"));
        sb.append(getFromMapOrEmptyString(formMap, "fraudprobability"));
        sb.append(getFromMapOrEmptyString(formMap, "fraudremarks"));
        sb.append(getFromMapOrEmptyString(formMap, "fraudreport"));
        sb.append(getFromMapOrEmptyString(formMap, "fee"));
        sb.append(md5Secret);

        String md5Hash = DigestUtils.md5Hex(sb.toString());
        String md5check = formMap.get("md5check");

        logger.info("MD5Hash: " + md5Hash);
        logger.info("md5check: " + md5check);

        return md5check != null && md5Hash!= null && md5Hash.equals(md5check);
    }
}
