package no.haagensoftware.kontize.models;

import com.google.gson.annotations.Expose;
import no.haagensoftware.hyrrokkin.annotations.SerializedClassName;

/**
 * Created by jhsmbp on 25/02/14.
 */
@SerializedClassName("ticket")
public class PurchasedTicket {
    @Expose private String id;
    @Expose private String ticketId;
    private String userId;
    @Expose private String ordernumber;
    @Expose private String ticketType;
    @Expose private String ticketHolder;

    public PurchasedTicket() {
    }

    public PurchasedTicket(PurchasedTicket purchasedTicket) {
        this.id = purchasedTicket.getId();
        this.ticketId = purchasedTicket.getTicketId();
        this.userId = purchasedTicket.getUserId();
        this.ordernumber = purchasedTicket.getOrdernumber();
        this.ticketType = purchasedTicket.getTicketType();
        this.ticketHolder = purchasedTicket.getTicketHolder();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getOrdernumber() {
        return ordernumber;
    }

    public void setOrdernumber(String ordernumber) {
        this.ordernumber = ordernumber;
    }

    public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }

    public String getTicketHolder() {
        return ticketHolder;
    }

    public void setTicketHolder(String ticketHolder) {
        this.ticketHolder = ticketHolder;
    }
}
