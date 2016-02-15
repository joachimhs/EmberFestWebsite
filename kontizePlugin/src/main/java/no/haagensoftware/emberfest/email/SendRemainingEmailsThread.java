package no.haagensoftware.emberfest.email;

import no.haagensoftware.contentice.spi.StoragePlugin;
import no.haagensoftware.kontize.db.dao.TicketsDao;
import no.haagensoftware.kontize.models.Order;
import org.apache.log4j.Logger;

import java.util.List;

/**
 * Created by jhsmbp on 19/02/14.
 */
public class SendRemainingEmailsThread implements Runnable {
    private static final Logger logger = Logger.getLogger(SendRemainingEmailsThread.class.getName());

    private StoragePlugin storagePlugin;
    private String host;
    private TicketsDao ticketsDao;

    public SendRemainingEmailsThread(String host, StoragePlugin storagePlugin) {
        this.storagePlugin = storagePlugin;
        this.host = host;
        this.ticketsDao = new TicketsDao(this.storagePlugin);
    }

    @Override
    public void run() {
        List<Order> confirmationOrders = ticketsDao.getOrdersWithoutConfirmationEmail(host);

        logger.info("Sending remaining emails: " + confirmationOrders.size());

        for (Order order: confirmationOrders) {

            OrderEpostThread orderEpostThread = new OrderEpostThread(host, order, storagePlugin);
            orderEpostThread.run();
        }
    }
}
