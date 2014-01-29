package no.haagensoftware.kontize.models;

import java.util.List;

/**
 * Created by jhsmbp on 1/28/14.
 */
public class TicketTypeList {
    private List<TicketType> ticketTypes;

    public TicketTypeList() {
    }

    public List<TicketType> getTicketTypes() {
        return ticketTypes;
    }

    public void setTicketTypes(List<TicketType> ticketTypes) {
        this.ticketTypes = ticketTypes;
    }
}
