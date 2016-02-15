package no.haagensoftware.kontize.models;

/**
 * Created by jhsmbp on 14/03/15.
 */
public class EmberfestStripeToken {
    private String stripeToken;
    private String stripeTokenString;
    private String stripeEmail;
    private String order;

    public EmberfestStripeToken() {
    }

    public String getStripeToken() {
        return stripeToken;
    }

    public void setStripeToken(String stripeToken) {
        this.stripeToken = stripeToken;
    }

    public String getStripeTokenString() {
        return stripeTokenString;
    }

    public void setStripeTokenString(String stripeTokenString) {
        this.stripeTokenString = stripeTokenString;
    }

    public String getStripeEmail() {
        return stripeEmail;
    }

    public void setStripeEmail(String stripeEmail) {
        this.stripeEmail = stripeEmail;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }
}
