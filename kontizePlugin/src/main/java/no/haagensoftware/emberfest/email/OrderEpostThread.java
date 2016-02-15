package no.haagensoftware.emberfest.email;

import no.haagensoftware.contentice.spi.StoragePlugin;
import no.haagensoftware.contentice.util.FileUtil;
import no.haagensoftware.kontize.db.dao.TicketsDao;
import no.haagensoftware.kontize.models.Order;
import org.apache.log4j.Logger;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.IOException;
import java.util.Properties;

/**
 * Created by jhsmbp on 19/02/14.
 */
public class OrderEpostThread implements Runnable {
    private static final Logger logger = Logger.getLogger(OrderEpostThread.class.getName());

    private Order order;
    private StoragePlugin storagePlugin;
    private TicketsDao ticketsDao;
    private String host;

    public OrderEpostThread(String host, Order order, StoragePlugin storagePlugin) {
        this.host = host;
        this.order = order;
        this.storagePlugin = storagePlugin;
        this.ticketsDao = new TicketsDao(this.storagePlugin);
    }

    @Override
    public void run() {
        String filename = System.getProperty("no.haagensoftware.contentice.webappDir") + "/" + host +  "/emailTemplates/order.html";
        File template = new File(filename);
        String templateHtml = null;

        if (template != null && template.isFile() && template.exists()) {
            try {
                templateHtml = FileUtil.getFilecontents(template);
            } catch (IOException e) {
                e.printStackTrace();
                templateHtml = null;
            }
        }


        if (order != null && templateHtml != null) {
            if (sendEmailWithSSL("Thank you for your Ember Fest Order!", templateHtml, order.getUserId())) {
                order.setConfirmationEmailSent(true);

                ticketsDao.storeOrder(host, order);
            }
        }
    }

    private boolean sendEmailWithSSL(String emailSubject, String emailMessage, String recipient) {
        boolean success = true;

        String host = System.getProperty("eu.emberfest.smtp.host");
        int port = 25;
        final String username = System.getProperty("eu.emberefst.smtp.user");
        final String password = System.getProperty("eu.emberfest.smtp.password");


        Properties props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.socketFactory.port", "" + 465);
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "" + 465);


        logger.info("Creating email session");
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            logger.info("Creating transport");

            Transport.send(buildMessage(session, recipient, emailSubject, emailMessage));
        } catch (MessagingException e) {
            e.printStackTrace();
            success = false;
        }

        logger.info("Email send success: " + success);

        return success;
    }

    private Message buildMessage(Session session, String recipient, String emailSubject, String emailMessage) throws AddressException, MessagingException {
        MimeMessage message = new MimeMessage(session);
        message.setHeader("Content-Type", "text/plain");
        message.setFrom(new InternetAddress("mail@emberfest.eu"));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient + ", mail@emberfest.eu"));
        message.setSubject(emailSubject);
        message.setText(emailMessage);
        message.setContent(emailMessage, "text/html; charset=utf-8");


        return message;
    }
}
