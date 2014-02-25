package no.haagensoftware.kontize.handler;

import com.google.gson.Gson;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;
import no.haagensoftware.contentice.handler.ContenticeHandler;
import no.haagensoftware.kontize.db.dao.TicketsDao;
import no.haagensoftware.kontize.models.TicketType;
import no.haagensoftware.kontize.models.TicketTypeList;
import no.haagensoftware.kontize.models.TicketTypeObject;
import sun.security.krb5.internal.Ticket;

import java.util.List;

/**
 * Created by jhsmbp on 1/28/14.
 */
public class TicketTypesHandler extends ContenticeHandler {
    private TicketsDao ticketsDao = null;

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, FullHttpRequest fullHttpRequest) throws Exception {
        String jsonReturn = "";

        if (ticketsDao == null) {
            ticketsDao = new TicketsDao(getStorage());
        }

        String ticketTypeId = getParameter("ticketType");

        if (isGet(fullHttpRequest) && ticketTypeId == null) {
            //Get all
            List<TicketType> ticketTypes = ticketsDao.getActiveTicketTypes();
            TicketTypeList ticketTypeList = new TicketTypeList();
            ticketTypeList.setTicketTypes(ticketTypes);

            jsonReturn = new Gson().toJson(ticketTypeList);
        } else if (isGet(fullHttpRequest) && ticketTypeId != null) {
            //Get single

            TicketType foundTicketType = null;

            List<TicketType> ticketTypes = ticketsDao.getActiveTicketTypes();
            for (TicketType ticketType : ticketTypes) {
                if (ticketType.getId().equals(ticketTypeId)) {
                    foundTicketType = ticketType;
                }
            }

            TicketTypeObject topObject = new TicketTypeObject();
            topObject.setTicketType(foundTicketType);
            jsonReturn = new Gson().toJson(topObject);
        }

        writeContentsToBuffer(channelHandlerContext, jsonReturn, "application/json");
    }
}
