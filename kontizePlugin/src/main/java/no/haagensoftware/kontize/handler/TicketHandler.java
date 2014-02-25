package no.haagensoftware.kontize.handler;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;

import java.util.ArrayList;
import java.util.List;

import no.haagensoftware.contentice.handler.ContenticeHandler;
import no.haagensoftware.kontize.db.dao.TicketsDao;
import no.haagensoftware.kontize.models.AuthenticationResult;
import no.haagensoftware.kontize.models.PurchasedTicket;
import no.haagensoftware.kontize.models.PurchasedTicketObject;
import no.haagensoftware.kontize.models.PurchasedTicketsArray;
import org.apache.log4j.Logger;

/**
 * Created by jhsmbp on 25/02/14.
 */
public class TicketHandler extends ContenticeHandler {
    private static final Logger logger = Logger.getLogger(TicketHandler.class.getName());

    private AuthenticationContext authenticationContext;
    private TicketsDao ticketsDao = null;

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, FullHttpRequest fullHttpRequest) throws Exception {
        String jsonReturn = "";

        if (authenticationContext == null) {
            authenticationContext = AuthenticationContext.getInstance(getStorage());
        }

        if (ticketsDao == null) {
            ticketsDao = new TicketsDao(getStorage());
        }

        String cookieUuidToken = getCookieValue(fullHttpRequest, "uuidToken");
        AuthenticationResult cachedUserResult = null;
        if (cookieUuidToken != null) {
            cachedUserResult = authenticationContext.verifyUUidToken(cookieUuidToken);
            authenticationContext.isUser(cookieUuidToken, cachedUserResult.getUserId());
        }

        String ticketId = getParameter("ticketId");

        List<String> ids = getQueryStringIds();
        if (isGet(fullHttpRequest) && ids != null && ids.size() > 0 && cachedUserResult != null && cachedUserResult.isUuidValidated()) {
            List<PurchasedTicket> purchasedTickets = ticketsDao.getPurchasedTickets(cachedUserResult.getUserId());
            List<PurchasedTicket> tickets = new ArrayList<>();

            PurchasedTicketsArray topObject = new PurchasedTicketsArray();


            for (String id : ids) {
                for (PurchasedTicket purchasedTicket : purchasedTickets) {
                    if (purchasedTicket.getId().equals("tickets_" + cachedUserResult.getUserId() + "-" + id)) {
                        PurchasedTicket newPurchasedTicket = new PurchasedTicket(purchasedTicket);
                        newPurchasedTicket.setId(id);
                        tickets.add(newPurchasedTicket);
                    }
                }
            }

            topObject.setTickets(tickets);

            jsonReturn = new Gson().toJson(topObject);
        } else if (isPut(fullHttpRequest) && ticketId != null && cachedUserResult != null && cachedUserResult.isUuidValidated()) {
            String messageContent = getHttpMessageContent(fullHttpRequest);
            logger.info(messageContent);

            //We can only ever update the ticketholder name, no other properties
            String ticketholderName = null;
            PurchasedTicketObject purchasedTicketObject = new Gson().fromJson(messageContent, PurchasedTicketObject.class);
            if (purchasedTicketObject != null && purchasedTicketObject.getTicket() != null) {
                ticketholderName = purchasedTicketObject.getTicket().getTicketHolder();
            }

            PurchasedTicket storedTicket = ticketsDao.getPurchasedTicket(cachedUserResult.getUserId(), ticketId);
            storedTicket.setTicketHolder(ticketholderName);

            ticketsDao.storeTicket(storedTicket);

            PurchasedTicketObject topObject = new PurchasedTicketObject();
            storedTicket.setId(ticketId);
            topObject.setTicket(storedTicket);

            jsonReturn = new Gson().toJson(topObject);
        }

        writeContentsToBuffer(channelHandlerContext, jsonReturn, "application/json");
    }
}
