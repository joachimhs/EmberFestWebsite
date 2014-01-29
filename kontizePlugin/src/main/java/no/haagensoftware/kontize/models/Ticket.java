package no.haagensoftware.kontize.models;

/**
 * Created by jhsmbp on 1/28/14.
 */
public class Ticket {
    private String name;
    private Long price;
    private String type;

    public Ticket() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
