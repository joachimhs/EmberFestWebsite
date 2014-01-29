package no.haagensoftware.kontize.handler;

import com.google.gson.Gson;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;
import no.haagensoftware.contentice.handler.ContenticeHandler;
import no.haagensoftware.kontize.db.dao.TicketsDao;
import no.haagensoftware.kontize.models.TicketType;
import no.haagensoftware.kontize.models.TicketTypeList;
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

        if (isGet(fullHttpRequest)) {
            List<TicketType> ticketTypes = ticketsDao.getActiveTicketTypes();
            TicketTypeList ticketTypeList = new TicketTypeList();
            ticketTypeList.setTicketTypes(ticketTypes);

            jsonReturn = new Gson().toJson(ticketTypeList);
        }

        writeContentsToBuffer(channelHandlerContext, jsonReturn, "application/json; charset=UTF-8");
    }
}
