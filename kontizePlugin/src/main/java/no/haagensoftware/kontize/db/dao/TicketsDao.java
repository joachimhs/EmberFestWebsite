package no.haagensoftware.kontize.db.dao;

import com.google.gson.JsonPrimitive;
import no.haagensoftware.contentice.data.SubCategoryData;
import no.haagensoftware.contentice.spi.StoragePlugin;
import no.haagensoftware.kontize.models.Cookie;
import no.haagensoftware.kontize.models.Order;
import no.haagensoftware.kontize.models.Ticket;
import no.haagensoftware.kontize.models.TicketType;
import org.apache.log4j.Logger;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by jhsmbp on 1/28/14.
 */
public class TicketsDao {
    private static final Logger logger = Logger.getLogger(TicketsDao.class.getName());
    private StoragePlugin storagePlugin = null;

    public TicketsDao(StoragePlugin storagePlugin) {
        this.storagePlugin = storagePlugin;
    }

    public List<TicketType> getActiveTicketTypes() {
        List<TicketType> ticketTypes = new ArrayList<>();

        for (SubCategoryData subCategoryData : storagePlugin.getSubCategories("ticketTypes")) {
            if (subCategoryData.getKeyMap().get("active") != null && subCategoryData.getKeyMap().get("active").getAsBoolean()) {
                ticketTypes.add(convertSubcategoryToTicketType(subCategoryData));
            }
        }

        return ticketTypes;
    }

    public void storeOrder(Order order) {
        storagePlugin.setSubCategory("orders", order.getOrderNumber(), convertOrderToSubcategoryData(order));
    }

    private SubCategoryData convertOrderToSubcategoryData(Order order) {
        SubCategoryData subCategoryData = new SubCategoryData();

        subCategoryData.setId(order.getOrderNumber());

        if (order.getStatus() != null) {
            subCategoryData.getKeyMap().put("status", new JsonPrimitive(order.getStatus()));
        }

        if (order.getTickets() != null) {
            String tickets = "";
            for (Ticket ticket : order.getTickets()) {
                if (tickets.length() == 0) {
                    tickets += ticket.getType();
                } else {
                    tickets += "," + ticket.getType();
                }
            }
            subCategoryData.getKeyMap().put("tickets", new JsonPrimitive(tickets));
        }

        if (order.getSubtotal() != null) {
            subCategoryData.getKeyMap().put("subtotal", new JsonPrimitive(order.getSubtotal()));
        }

        if (order.getUserId() != null) {
            subCategoryData.getKeyMap().put("userId", new JsonPrimitive(order.getUserId()));
        }

        return subCategoryData;
    }

    public static TicketType convertSubcategoryToTicketType(SubCategoryData subCategoryData) {
        TicketType ticketType = new TicketType();

        ticketType.setId(subCategoryData.getId());
        if (ticketType.getId().startsWith("ticketTypes_")) {
            ticketType.setId(ticketType.getId().substring(12));
        }

        ticketType.setName(subCategoryData.getValueForKey("name"));
        ticketType.setDescription(subCategoryData.getValueForKey("description"));
        ticketType.setActive(new Boolean(subCategoryData.getValueForKey("active")));
        ticketType.setPrice(subCategoryData.getLongValueForKey("price"));
        ticketType.setTicketsAvailable(subCategoryData.getLongValueForKey("ticketsAvailable"));

        return ticketType;
    }
}
