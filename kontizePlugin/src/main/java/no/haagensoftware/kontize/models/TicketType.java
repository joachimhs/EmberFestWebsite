package no.haagensoftware.kontize.models;

/**
 * Created by jhsmbp on 1/28/14.
 */
public class TicketType {
    private String id;
    private String name;
    private String description;
    private Long price;
    private Long ticketsAvailable;
    private Boolean active;

    public TicketType() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Long getTicketsAvailable() {
        return ticketsAvailable;
    }

    public void setTicketsAvailable(Long ticketsAvailable) {
        this.ticketsAvailable = ticketsAvailable;
    }
}
