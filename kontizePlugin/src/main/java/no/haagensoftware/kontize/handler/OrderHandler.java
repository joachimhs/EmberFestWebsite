package no.haagensoftware.kontize.handler;

import com.google.gson.Gson;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;
import no.haagensoftware.contentice.handler.ContenticeHandler;
import no.haagensoftware.kontize.db.dao.TicketsDao;
import no.haagensoftware.kontize.db.dao.UserDao;
import no.haagensoftware.kontize.models.*;

/**
 * Created by jhsmbp on 22/05/14.
 */
public class OrderHandler extends ContenticeHandler {

    private TicketsDao ticketsDao = null;
    private UserDao userDao = null;
    private AuthenticationContext authenticationContext;

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, FullHttpRequest fullHttpRequest) throws Exception {
        String jsonReturn = "";

        if (authenticationContext == null) {
            authenticationContext = AuthenticationContext.getInstance(getStorage());
        }

        if (ticketsDao == null) {
            ticketsDao = new TicketsDao(getStorage());
        }

        if (userDao == null) {
            userDao = new UserDao(getStorage());
        }

        String cookieUuidToken = getCookieValue(fullHttpRequest, "uuidToken");
        AuthenticationResult cachedUserResult = null;
        if (cookieUuidToken != null) {
            cachedUserResult = authenticationContext.verifyUUidToken(getDomain().getWebappName(), cookieUuidToken);
        }

        String domain = getDomain().getWebappName();

        String ordernumber = getParameter("orderId");

        UserOrder userOrder = new UserOrder();

        if (ordernumber != null) {
            userOrder.setId(ordernumber);
            Order order = ticketsDao.getOrderForOrderId(domain, ordernumber);

            if (cachedUserResult != null && cachedUserResult.getUserId().equals(order.getUserId())) {
                if (order != null) {
                    for (PurchasedTicket purchasedTicket : ticketsDao.getPurchasedTicketsForOrderId(domain, order.getOrderNumber())) {
                        userOrder.getTickets().add(purchasedTicket.getId());
                    }

                    User user = userDao.getUser(domain, order.getUserId());

                    if (user != null) {
                        userOrder.setCompanyName(user.getCompany());
                        userOrder.setCountry(user.getCountryOfResidence());
                    }

                    userOrder.setSubtotal(order.getSubtotal() / 100);
                    if (order.getCouponDiscount() != null) {
                        userOrder.setCouponDiscount(order.getCouponDiscount() / 100);
                    } else {
                        userOrder.setCouponDiscount(0l);
                    }

                    userOrder.setOrderNumber(order.getOrderNumber());
                }
            }
        }

        UserOrderObject userOrderObject = new UserOrderObject();
        userOrderObject.setOrder(userOrder);

        writeContentsToBuffer(channelHandlerContext, new Gson().toJson(userOrderObject), "application/json");
    }
}
