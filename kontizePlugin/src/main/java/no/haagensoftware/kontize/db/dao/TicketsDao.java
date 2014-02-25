package no.haagensoftware.kontize.db.dao;

import com.google.gson.JsonPrimitive;
import no.haagensoftware.contentice.data.SubCategoryData;
import no.haagensoftware.contentice.spi.StoragePlugin;
import no.haagensoftware.kontize.models.*;
import org.apache.log4j.Logger;

import java.text.SimpleDateFormat;
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

    public TicketType getTicketType(String type) {
        TicketType ticketType = null;

        SubCategoryData ticketData = storagePlugin.getSubCategory("ticketTypes", type);

        if (ticketData != null) {
            ticketType = convertSubcategoryToTicketType(ticketData);
        }

        return ticketType;
    }

    public void storeTicketType(TicketType ticketType) {
        SubCategoryData subCategoryData = convertTicketTypeToSubcategory(ticketType);
        storagePlugin.setSubCategory("ticketTypes", subCategoryData.getId(), subCategoryData);
    }

    public List<PurchasedTicket> getPurchasedTickets(String userid) {
        List<PurchasedTicket> purchasedTicketList = new ArrayList<>();

        for (SubCategoryData subCategoryData : storagePlugin.getSubCategories("tickets")) {
            PurchasedTicket pt = convertSubcategoryToPurchasedTicket(subCategoryData);
            if (pt.getUserId().equals(userid)) {
                purchasedTicketList.add(pt);
            }
        }

        return purchasedTicketList;
    }

    public PurchasedTicket getPurchasedTicket(String userid, String ticketid) {
        PurchasedTicket purchasedTicket = null;

        SubCategoryData subCategoryData = storagePlugin.getSubCategory("tickets", userid + "-" + ticketid);
        if (subCategoryData != null) {
            purchasedTicket = convertSubcategoryToPurchasedTicket(subCategoryData);
        }

        return purchasedTicket;
    }

    public void storeTicket(PurchasedTicket ticket) {
        SubCategoryData subCategoryData = convertPurchasedTicketToSubcategory(ticket);

        storagePlugin.setSubCategory("tickets", subCategoryData.getId(), subCategoryData);
    }


    public void storeOrder(Order order) {
        storagePlugin.setSubCategory("orders", order.getOrderNumber(), convertOrderToSubcategoryData(order));
    }

    public Order getNewOrderForUser(String userid) {
        Order foundOrder = null;

        List<SubCategoryData> subCategoryDataList = storagePlugin.getSubCategories("orders");

        for (SubCategoryData subCategoryData : subCategoryDataList) {
            Order order = convertSubcategoryDataToOrder(subCategoryData);
            if (order.getUserId().equals(userid) && order.getStatus().equals("new")) {
                foundOrder = order;
            }
        }

        return foundOrder;
    }

    private Order convertSubcategoryDataToOrder(SubCategoryData subCategoryData) {
        Order order = new Order();
        order.setUserId(subCategoryData.getId());

        order.setStatus(subCategoryData.getValueForKey("status"));

        List<Ticket> ticketList = new ArrayList<>();

        Long subtotal = 0l;

        for (String ticketType : subCategoryData.getListForKey("tickets", ",")) {
            TicketType tt = this.getTicketType(ticketType);
            Ticket newTicket = new Ticket();
            newTicket.setName(tt.getName());
            newTicket.setType(ticketType);
            newTicket.setPrice(tt.getPrice());

            ticketList.add(newTicket);

            subtotal += (newTicket.getPrice() * 100);
        }
        order.setTickets(ticketList);
        order.setSubtotal(subtotal);

        order.setUserId(subCategoryData.getValueForKey("userId"));

        if (subCategoryData.getValueForKey("ordernumber") != null) {
            order.setOrderNumber(subCategoryData.getValueForKey("ordernumber"));
        } else {
            order.setOrderNumber(subCategoryData.getName());
        }


        return order;
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
        ticketType.setAvailableFrom(subCategoryData.getDateForKey("availableFrom"));
        ticketType.setSortIndex(subCategoryData.getLongValueForKey("sortIndex"));

        return ticketType;
    }

    public static SubCategoryData convertTicketTypeToSubcategory(TicketType ticketType) {
        SubCategoryData tt = new SubCategoryData();
        tt.setId(ticketType.getId());
        tt.setName(ticketType.getName());

        if (ticketType.getName() != null) {
            tt.getKeyMap().put("name", new JsonPrimitive(ticketType.getName()));
        }

        if (ticketType.getDescription() != null) {
            tt.getKeyMap().put("description", new JsonPrimitive(ticketType.getDescription()));
        }

        if (ticketType.getActive() != null) {
            tt.getKeyMap().put("active", new JsonPrimitive(ticketType.getActive()));
        }

        if (ticketType.getPrice() != null) {
            tt.getKeyMap().put("price", new JsonPrimitive(ticketType.getPrice()));
        }

        if (ticketType.getTicketsAvailable() != null) {
            tt.getKeyMap().put("ticketsAvailable", new JsonPrimitive(ticketType.getTicketsAvailable()));
        }

        if (ticketType.getAvailableFrom() != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            tt.getKeyMap().put("availableFrom", new JsonPrimitive(sdf.format(ticketType.getAvailableFrom())));
        }

        if (ticketType.getSortIndex() != null) {
            tt.getKeyMap().put("sortIndex", new JsonPrimitive(ticketType.getSortIndex()));
        }

        return tt;
    }

    public static PurchasedTicket convertSubcategoryToPurchasedTicket(SubCategoryData subCategoryData) {
        PurchasedTicket pt = new PurchasedTicket();
        pt.setId(subCategoryData.getId());
        pt.setOrdernumber(subCategoryData.getValueForKey("ordernumber"));
        pt.setTicketHolder(subCategoryData.getValueForKey("ticketHolderName"));
        pt.setTicketType(subCategoryData.getValueForKey("ticketType"));
        pt.setUserId(subCategoryData.getValueForKey("userId"));
        pt.setTicketId(subCategoryData.getValueForKey("ticketId"));

        return pt;
    }

    public static SubCategoryData convertPurchasedTicketToSubcategory(PurchasedTicket purchasedTicket) {
        SubCategoryData subCategoryData = new SubCategoryData();
        subCategoryData.setId(purchasedTicket.getId());

        if (purchasedTicket.getId().startsWith("tickets_")) {
            subCategoryData.setId(purchasedTicket.getId().substring(8));
        }

        if (purchasedTicket.getOrdernumber() != null) {
            subCategoryData.getKeyMap().put("ordernumber", new JsonPrimitive(purchasedTicket.getOrdernumber()));
        }

        if (purchasedTicket.getTicketHolder() != null) {
            subCategoryData.getKeyMap().put("ticketHolderName", new JsonPrimitive(purchasedTicket.getTicketHolder()));
        }

        if (purchasedTicket.getTicketType() != null) {
            subCategoryData.getKeyMap().put("ticketType", new JsonPrimitive(purchasedTicket.getTicketType()));
        }

        if (purchasedTicket.getUserId() != null) {
            subCategoryData.getKeyMap().put("userId", new JsonPrimitive(purchasedTicket.getUserId()));
        }

        if (purchasedTicket.getTicketId() != null) {
            subCategoryData.getKeyMap().put("ticketId", new JsonPrimitive(purchasedTicket.getTicketId()));
        }

        return subCategoryData;
    }
}
