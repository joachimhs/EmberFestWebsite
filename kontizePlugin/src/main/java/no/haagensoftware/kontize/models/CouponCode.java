package no.haagensoftware.kontize.models;

import java.util.Date;

/**
 * Created by jhsmbp on 07/05/14.
 */
public class CouponCode {
    private String id;
    private Date validFrom;
    private Date validTo;
    private boolean active;
    private Double discountAmount;

    public CouponCode() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(Date validFrom) {
        this.validFrom = validFrom;
    }

    public Date getValidTo() {
        return validTo;
    }

    public void setValidTo(Date validTo) {
        this.validTo = validTo;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Double getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(Double discountAmount) {
        this.discountAmount = discountAmount;
    }

    public boolean isValid() {
        Date now = new Date();

        boolean valid = validFrom != null && validFrom.before(now) && validTo != null && validTo.after(now) && active && discountAmount != null && discountAmount > 0d;

        return valid;
    }
}
