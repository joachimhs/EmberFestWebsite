package no.haagensoftware.kontize.handler;

import com.google.gson.Gson;
import com.google.gson.JsonPrimitive;
import com.stripe.Stripe;
import com.stripe.model.Charge;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;
import no.haagensoftware.contentice.data.SubCategoryData;
import no.haagensoftware.contentice.handler.ContenticeHandler;
import no.haagensoftware.kontize.db.dao.TicketsDao;
import no.haagensoftware.kontize.models.EmberfestStripeToken;
import no.haagensoftware.kontize.models.Order;
import no.haagensoftware.kontize.models.Ticket;
import no.haagensoftware.kontize.models.TicketType;
import org.apache.log4j.Logger;

import java.util.*;

/**
 * Created by jhsmbp on 30/05/15.
 */
public class EmberfestStripePaymentHandler extends ContenticeHandler {
    private static final Logger logger = Logger.getLogger(EmberfestStripePaymentHandler.class.getName());

    private TicketsDao ticketsDao = null;

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, FullHttpRequest fullHttpRequest) throws Exception {
        Stripe.apiKey = System.getProperty("eu.emberfest.stripeSecret");

        if (ticketsDao == null) {
            ticketsDao = new TicketsDao(getStorage());
        }

        String messageContent = getHttpMessageContent(fullHttpRequest);

        String uuidToken = getCookieValue(fullHttpRequest, "uuidToken");

        logger.info("Stripe Payment payload:");
        logger.info(messageContent);

        EmberfestStripeToken token = new Gson().fromJson(messageContent, EmberfestStripeToken.class);

        /*QueryStringDecoder qsd = new QueryStringDecoder("/?" + messageContent);
        String stripeToken = qsd.parameters().get("stripeToken").get(0);
        String stripeTokenType = qsd.parameters().get("stripeTokenType").get(0);
        String stripeEmail = qsd.parameters().get("stripeEmail").get(0);*/

        logger.info("stripeToken:" + token.getStripeToken());
        logger.info("stripeTokenType:" + token.getStripeTokenString());
        logger.info("stripeEmail:" + token.getStripeEmail());
        logger.info("stripeOrder:" + token.getOrder());

        Order order = ticketsDao.getNewOrderForOrderId(getDomain().getWebappName(), token.getOrder());

        Map<String, Object> chargeParams = new HashMap<String, Object>();

        Long chargeAmount = order.getSubtotal();
        if (order.getCouponDiscount() != null && order.getCouponDiscount().longValue() > 0) {
            chargeAmount -= order.getCouponDiscount();
        }

        chargeParams.put("amount", chargeAmount);
        chargeParams.put("currency", "eur");
        chargeParams.put("card", token.getStripeToken()); // obtained with Stripe.js
        chargeParams.put("description", "Emberfest Order for " + token.getStripeEmail());

        Charge charge = Charge.create(chargeParams);

        boolean paymentSuccessful = false;
        if (charge.getPaid().booleanValue() && charge.getCaptured().booleanValue()) {
            paymentSuccessful = charge.getPaid().booleanValue();

            order.setStatus(paymentSuccessful ? "paid" : "failed");
            order.setAmount("" + charge.getAmount());
            order.setCurrency(charge.getCurrency());
            order.setTime("" + charge.getCreated());
            order.setTransaction(charge.getId());
            order.setMsgtype(new Gson().toJson(charge));

            List<String> ticketIds = createTickets(order.getUserId(), order.getOrderNumber(), order.getTickets());
            order.setTicketIds(ticketIds);

            ticketsDao.storeOrder(getDomain().getWebappName(), order);
        }

        logger.info(new Gson().toJson(charge));

        String returnVal = "{\"status\": \"" + (paymentSuccessful ? "succeeded" : "failed") + "\"}";

        writeContentsToBuffer(channelHandlerContext, returnVal, "application/json");
    }

    private List<String> createTickets(String userId, String ordernumber, List<Ticket> ticketTypes) {
        List<String> ticketIds = new ArrayList<>();

        logger.info("Creating " + ticketTypes.size() + " tickets for: " + userId + " with order number: " + ordernumber);

        if (ticketTypes != null && userId != null && ordernumber != null) {
            for (Ticket ticketType : ticketTypes) {
                logger.info("\tCreating ticket: " + ticketType.getType());

                String ticketId = UUID.randomUUID().toString();

                SubCategoryData ticket = new SubCategoryData();
                ticket.setId(userId + "-" + ticketId);
                ticket.getKeyMap().put("ticketId", new JsonPrimitive(ticketId));
                ticket.getKeyMap().put("userId", new JsonPrimitive(userId));
                ticket.getKeyMap().put("ordernumber", new JsonPrimitive(ordernumber));
                ticket.getKeyMap().put("ticketType", new JsonPrimitive(ticketType.getType()));

                logger.info("\tPersisting ticket: " + ticketType);

                getStorage().setSubCategory(getDomain().getWebappName(), "tickets", ticket.getId(), ticket);

                ticketIds.add(ticket.getId());
            }

            tickdownAvailableTickets(ticketTypes);
        }

        return ticketIds;
    }

    private void tickdownAvailableTickets(List<Ticket> ticketTypes) {
        if (ticketsDao == null) {
            ticketsDao = new TicketsDao(getStorage());
        }

        for (Ticket type : ticketTypes) {
            TicketType ticketType = ticketsDao.getTicketType(getDomain().getWebappName(), type.getType());
            ticketType.setTicketsAvailable(ticketType.getTicketsAvailable() - 1);
            ticketsDao.storeTicketType(getDomain().getWebappName(), ticketType);
        }
    }

    //eu.emberfest.stripeSecret
}
