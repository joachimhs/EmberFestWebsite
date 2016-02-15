package no.haagensoftware.emberfest.email;

import no.haagensoftware.contentice.spi.StoragePlugin;
import no.haagensoftware.kontize.models.Order;

import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * Created by jhsmbp on 19/02/14.
 */
public class EpostExecutor {
    private static EpostExecutor instance = null;
    private String host = null;

    private ScheduledThreadPoolExecutor threadPool = null;
    private SendRemainingEmailsThread sendRemainingEmailsThread = null;

    private EpostExecutor(String host) {
        threadPool = new ScheduledThreadPoolExecutor(10);
        this.host = host;
    }

    public static EpostExecutor getInstance(String host) {
        if (instance == null) {
            instance = new EpostExecutor(host);
        }

        return instance;
    }

    public boolean sendEmail(Order order, StoragePlugin storagePlugin) {
        threadPool.schedule(new OrderEpostThread(host, order, storagePlugin), 0, TimeUnit.MILLISECONDS);

        sendRemainingEmails(storagePlugin);

        return true;
    }

    public void sendRemainingEmails(StoragePlugin storagePlugin) {
        if (sendRemainingEmailsThread == null) {
            sendRemainingEmailsThread = new SendRemainingEmailsThread(host, storagePlugin);
            threadPool.scheduleAtFixedRate(sendRemainingEmailsThread, 0, 10000, TimeUnit.MILLISECONDS);
        }
    }
}
