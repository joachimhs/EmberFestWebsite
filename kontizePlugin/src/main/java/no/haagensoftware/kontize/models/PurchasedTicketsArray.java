package no.haagensoftware.kontize.models;

import java.util.ArrayList;
import java.util.List;
/**
 * Created by jhsmbp on 25/02/14.
 */
public class PurchasedTicketsArray {
    private List<PurchasedTicket> tickets;

    public PurchasedTicketsArray() {
        tickets = new ArrayList<>();
    }

    public List<PurchasedTicket> getTickets() {
        return tickets;
    }

    public void setTickets(List<PurchasedTicket> tickets) {
        this.tickets = tickets;
    }
}
