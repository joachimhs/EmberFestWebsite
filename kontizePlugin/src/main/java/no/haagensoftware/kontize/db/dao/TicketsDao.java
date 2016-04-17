package no.haagensoftware.kontize.db.dao;

import com.google.gson.JsonArray;
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

    public List<TicketType> getActiveTicketTypes(String host) {
        List<TicketType> ticketTypes = new ArrayList<>();

        for (SubCategoryData subCategoryData : storagePlugin.getSubCategories(host, "ticketTypes")) {
            if (subCategoryData.getKeyMap().get("active") != null && subCategoryData.getKeyMap().get("active").getAsBoolean()) {
                ticketTypes.add(convertSubcategoryToTicketType(subCategoryData));
            }
        }

        return ticketTypes;
    }

    public TicketType getTicketType(String host, String type) {
        TicketType ticketType = null;

        SubCategoryData ticketData = storagePlugin.getSubCategory(host, "ticketTypes", type);

        if (ticketData != null) {
            ticketType = convertSubcategoryToTicketType(ticketData);
        }

        return ticketType;
    }

    public void storeTicketType(String host, TicketType ticketType) {
        SubCategoryData subCategoryData = convertTicketTypeToSubcategory(ticketType);
        storagePlugin.setSubCategory(host, "ticketTypes", subCategoryData.getId(), subCategoryData);
    }

    public List<PurchasedTicket> getPurchasedTickets(String host, String userid) {
        List<PurchasedTicket> purchasedTicketList = new ArrayList<>();

        for (SubCategoryData subCategoryData : storagePlugin.getSubCategories(host, "tickets")) {
            PurchasedTicket pt = convertSubcategoryToPurchasedTicket(subCategoryData);
            if (pt.getUserId().equals(userid)) {
                purchasedTicketList.add(pt);
            }
        }

        return purchasedTicketList;
    }

    public List<PurchasedTicket> getPurchasedTicketsForOrderId(String host, String orderId, String userId) {
        List<PurchasedTicket> purchasedTicketList = new ArrayList<>();

        for (SubCategoryData subCategoryData : storagePlugin.getSubCategories(host, "tickets")) {
            PurchasedTicket pt = convertSubcategoryToPurchasedTicket(subCategoryData);
            if (pt.getOrdernumber().equals(orderId)) {
                if (pt.getId().startsWith("tickets_" + userId)) {
                    pt.setId(pt.getTicketId());
                }
                purchasedTicketList.add(pt);
            }
        }

        return purchasedTicketList;
    }

    public PurchasedTicket getPurchasedTicket(String host, String userid, String ticketid) {
        PurchasedTicket purchasedTicket = null;

        SubCategoryData subCategoryData = storagePlugin.getSubCategory(host, "tickets", userid + "-" + ticketid);
        if (subCategoryData != null) {
            purchasedTicket = convertSubcategoryToPurchasedTicket(subCategoryData);
        }

        return purchasedTicket;
    }

    public void storeTicket(String host, PurchasedTicket ticket) {
        SubCategoryData subCategoryData = convertPurchasedTicketToSubcategory(ticket);

        storagePlugin.setSubCategory(host, "tickets", subCategoryData.getId(), subCategoryData);
    }


    public void storeOrder(String host, Order order) {
        SubCategoryData sd = convertOrderToSubcategoryData(order);
        storagePlugin.setSubCategory(host, "orders", order.getOrderNumber(), sd);
    }

    public Order getNewOrderForUser(String host, String userid) {
        Order foundOrder = null;

        List<SubCategoryData> subCategoryDataList = storagePlugin.getSubCategories(host, "orders");

        for (SubCategoryData subCategoryData : subCategoryDataList) {
            Order order = convertSubcategoryDataToOrder(host, subCategoryData);
            //new for Stripe, approved for QuickPay
            if (order.getUserId().equals(userid) && (order.getStatus().equals("new") || order.getStatus().equals("approved"))) {
                foundOrder = order;
            }
        }

        return foundOrder;
    }

    public List<Order> getOrdersWithoutConfirmationEmail(String host) {
        List<Order> foundOrders = new ArrayList<>();

        List<SubCategoryData> subCategoryDataList = storagePlugin.getSubCategories(host, "orders");

        for (SubCategoryData subCategoryData : subCategoryDataList) {
            Order order = convertSubcategoryDataToOrder(host, subCategoryData);
            //new for Stripe, approved for QuickPay
            if (!order.getConfirmationEmailSent() && order.getTransaction() != null) {
                foundOrders.add(order);
            }
        }

        return foundOrders;
    }

    public Order getNewOrderForOrderId(String host, String orderId) {
        Order foundOrder = null;

        List<SubCategoryData> subCategoryDataList = storagePlugin.getSubCategories(host, "orders");

        for (SubCategoryData subCategoryData : subCategoryDataList) {
            if (subCategoryData.getValueForKey("ordernumber") != null && subCategoryData.getValueForKey("ordernumber").equals(orderId)
                    && subCategoryData.getValueForKey("status") != null && subCategoryData.getValueForKey("status").equals("new")) {

                Order order = convertSubcategoryDataToOrder(host, subCategoryData);
                if (order.getStatus().equals("new")) {
                    foundOrder = order;
                }
            }
        }

        return foundOrder;
    }

    public Order getOrderForOrderId(String host, String orderId) {
        Order foundOrder = null;

        SubCategoryData orderSd = storagePlugin.getSubCategory(host, "orders", orderId);

        if (orderSd != null) {
            Order order = convertSubcategoryDataToOrder(host, orderSd);
            foundOrder = order;
        }

        return foundOrder;
    }

    private Order convertSubcategoryDataToOrder(String host, SubCategoryData subCategoryData) {
        Order order = new Order();
        order.setUserId(subCategoryData.getId());

        order.setStatus(subCategoryData.getValueForKey("status"));

        List<Ticket> ticketList = new ArrayList<>();

        Long subtotal = 0l;

        for (String ticketType : subCategoryData.getListForKey("tickets", ",")) {
            TicketType tt = this.getTicketType(host, ticketType);
            if (tt != null) {
                Ticket newTicket = new Ticket();
                newTicket.setName(tt.getName());
                newTicket.setType(ticketType);
                newTicket.setPrice(tt.getPrice());

                ticketList.add(newTicket);

                subtotal += (newTicket.getPrice() * 100);
            }
        }
        order.setTickets(ticketList);
        order.setSubtotal(subtotal);

        order.setUserId(subCategoryData.getValueForKey("userId"));

        if (subCategoryData.getValueForKey("ordernumber") != null) {
            order.setOrderNumber(subCategoryData.getValueForKey("ordernumber"));
        } else {
            order.setOrderNumber(subCategoryData.getName());
        }

        if (subCategoryData.getLongValueForKey("couponDiscount") != null) {
            order.setCouponDiscount(subCategoryData.getLongValueForKey("couponDiscount"));
        }

        if (subCategoryData.getValueForKey("couponCode") != null) {
            order.setCouponCode(subCategoryData.getValueForKey("couponCode"));
        }

        if (subCategoryData.getValueForKey("transaction") != null) {
            order.setTransaction(subCategoryData.getValueForKey("transaction"));
        }

        if (subCategoryData.getValueForKey("msgtype") != null) {
            order.setMsgtype(subCategoryData.getValueForKey("msgtype"));
        }

        if (subCategoryData.getValueForKey("ordernumber") != null) {
            order.setOrderNumber(subCategoryData.getValueForKey("ordernumber"));
        }

        if (subCategoryData.getValueForKey("amount") != null) {
            order.setAmount(subCategoryData.getValueForKey("amount"));
        }

        if (subCategoryData.getValueForKey("currency") != null) {
            order.setCurrency(subCategoryData.getValueForKey("currency"));
        }

        if (subCategoryData.getValueForKey("time") != null) {
            order.setTime(subCategoryData.getValueForKey("time"));
        }

        if (subCategoryData.getValueForKey("state") != null) {
            order.setState(subCategoryData.getValueForKey("state"));
        }

        if (subCategoryData.getValueForKey("qpstat") != null) {
            order.setQpstat(subCategoryData.getValueForKey("qpstat"));
        }

        if (subCategoryData.getValueForKey("cardtype") != null) {
            order.setCardtype(subCategoryData.getValueForKey("cardtype"));
        }

        if (subCategoryData.getValueForKey("cardnumber") != null) {
            order.setCardnumber(subCategoryData.getValueForKey("cardnumber"));
        }

        if (subCategoryData.getValueForKey("chstat") != null) {
            order.setChstat(subCategoryData.getValueForKey("chstat"));
        }

        order.setTicketIds(subCategoryData.getListForKey("ticketIds", ","));

        if (subCategoryData.getValueForKey("couponCode") != null) {
            order.setCouponCode(subCategoryData.getValueForKey("couponCode"));
        }

        order.setConfirmationEmailSent(subCategoryData.getBooleanValueForKey("confirmationEmailSent"));

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

        if (order.getCouponCode() != null) {
            subCategoryData.getKeyMap().put("couponCode", new JsonPrimitive(order.getCouponCode()));
        }

        if (order.getCouponDiscount() != null) {
            subCategoryData.getKeyMap().put("couponDiscount", new JsonPrimitive(order.getCouponDiscount()));
        }

        if (order.getTicketIds() != null && order.getTicketIds().size() > 0) {
            JsonArray ticketIdsArray = new JsonArray();
            for (String ticketId : order.getTicketIds()) {
                ticketIdsArray.add(new JsonPrimitive(ticketId));
            }

            subCategoryData.getKeyMap().put("ticketIds", ticketIdsArray);
        }

        if (order.getAmount() != null) {
            subCategoryData.getKeyMap().put("amount", new JsonPrimitive(order.getAmount()));
        }

        if (order.getCurrency() != null) {
            subCategoryData.getKeyMap().put("currency", new JsonPrimitive(order.getCurrency()));
        }

        if (order.getTime() != null) {
            subCategoryData.getKeyMap().put("time", new JsonPrimitive(order.getTime()));
        }

        if (order.getTransaction() != null) {
            subCategoryData.getKeyMap().put("transaction", new JsonPrimitive(order.getTransaction()));
        }

        if (order.getOrderNumber() != null) {
            subCategoryData.getKeyMap().put("ordernumber", new JsonPrimitive(order.getOrderNumber()));
        }

        if (order.getMsgtype() != null) {
            subCategoryData.getKeyMap().put("msgtype", new JsonPrimitive(order.getMsgtype()));
        }

        if (order.getUserId() != null) {
            subCategoryData.getKeyMap().put("userId", new JsonPrimitive(order.getUserId()));
        }

        if (order.getCurrency() != null) {
            subCategoryData.getKeyMap().put("currency", new JsonPrimitive(order.getCurrency()));
        }

        if (order.getState() != null) {
            subCategoryData.getKeyMap().put("state", new JsonPrimitive(order.getState()));
        }

        if (order.getQpstat() != null) {
            subCategoryData.getKeyMap().put("qpstat", new JsonPrimitive(order.getQpstat()));
        }

        if (order.getCardtype() != null) {
            subCategoryData.getKeyMap().put("cardtype", new JsonPrimitive(order.getCardtype()));
        }

        if (order.getConfirmationEmailSent() != null && order.getConfirmationEmailSent().booleanValue()) {
            subCategoryData.getKeyMap().put("confirmationEmailSent", new JsonPrimitive(order.getConfirmationEmailSent().booleanValue()));
        } else {
            subCategoryData.getKeyMap().put("confirmationEmailSent", new JsonPrimitive(false));
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
        ticketType.setDiscountable(subCategoryData.getBooleanValueForKey("discountable"));

        return ticketType;
    }

    public static CouponCode convertSubcategoryToCouponCode(SubCategoryData subCategoryData) {
        CouponCode couponCode = new CouponCode();

        couponCode.setId(subCategoryData.getId());
        if (couponCode.getId().startsWith("couponCode_")) {
            couponCode.setId(couponCode.getId().substring(11));
        }

        couponCode.setActive(subCategoryData.getBooleanValueForKey("active"));
        couponCode.setValidFrom(subCategoryData.getDateForKey("validFrom"));
        couponCode.setValidTo(subCategoryData.getDateForKey("validTo"));
        couponCode.setDiscountAmount(subCategoryData.getDoubleValueForKey("discountAmount"));

        return couponCode;
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

        if (ticketType.getDiscountable() != null) {
            tt.getKeyMap().put("discountable", new JsonPrimitive(ticketType.getDiscountable()));
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
