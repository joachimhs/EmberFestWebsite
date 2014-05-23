package no.haagensoftware.kontize.models;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by jhsmbp on 1/28/14.
 */
public class Order {
    private String orderNumber;
    private String couponCode;
    private Long couponDiscount;
    private String status;
    private String userId;
    private Long subtotal;
    private List<Ticket> tickets;
    private String msgtype;
    private String amount;
    private String currency;
    private String qpOrdernumber;
    private String time;
    private String state;
    private String qpstat;
    private String transaction;
    private String cardtype;
    private String cardnumber;
    private String chstat;
    private String chstatmsg;

    public Order() {
        tickets = new ArrayList<>();
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public Long getCouponDiscount() {
        return couponDiscount;
    }

    public void setCouponDiscount(Long couponDiscount) {
        this.couponDiscount = couponDiscount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Long subtotal) {
        this.subtotal = subtotal;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public String getMsgtype() {
        return msgtype;
    }

    public void setMsgtype(String msgtype) {
        this.msgtype = msgtype;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getQpOrdernumber() {
        return qpOrdernumber;
    }

    public void setQpOrdernumber(String qpOrdernumber) {
        this.qpOrdernumber = qpOrdernumber;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getQpstat() {
        return qpstat;
    }

    public void setQpstat(String qpstat) {
        this.qpstat = qpstat;
    }

    public String getTransaction() {
        return transaction;
    }

    public void setTransaction(String transaction) {
        this.transaction = transaction;
    }

    public String getCardtype() {
        return cardtype;
    }

    public void setCardtype(String cardtype) {
        this.cardtype = cardtype;
    }

    public String getCardnumber() {
        return cardnumber;
    }

    public void setCardnumber(String cardnumber) {
        this.cardnumber = cardnumber;
    }

    public String getChstat() {
        return chstat;
    }

    public void setChstat(String chstat) {
        this.chstat = chstat;
    }

    public String getChstatmsg() {
        return chstatmsg;
    }

    public void setChstatmsg(String chstatmsg) {
        this.chstatmsg = chstatmsg;
    }
}
