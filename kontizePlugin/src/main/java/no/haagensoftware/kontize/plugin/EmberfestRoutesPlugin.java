package no.haagensoftware.kontize.plugin;

import io.netty.channel.ChannelHandler;
import no.haagensoftware.contentice.handler.FileServerHandler;
import no.haagensoftware.contentice.spi.RouterPlugin;
import no.haagensoftware.kontize.handler.*;
import org.apache.log4j.Logger;

import java.util.LinkedHashMap;
import java.util.Map;


/**
 * Created by jhsmbp on 1/24/14.
 */
public class EmberfestRoutesPlugin extends RouterPlugin {
    private static final Logger logger = Logger.getLogger(EmberfestRoutesPlugin.class.getName());

    LinkedHashMap<String, Class<? extends ChannelHandler>> routeMap;

    public EmberfestRoutesPlugin() {
        this.routeMap = new LinkedHashMap<>();

        routeMap.put("/auth/login", CredentialsHandler.class);
        routeMap.put("/auth/logout", CredentialsHandler.class);
        routeMap.put("/auth/registerNewUser", CredentialsHandler.class);

        routeMap.put("/json/users", UserHandler.class);
        routeMap.put("/json/users/{user}", UserHandler.class);

        routeMap.put("/json/talks", TalkHandler.class);
        routeMap.put("/json/talks/{talk}", TalkHandler.class);

        routeMap.put("/json/tickets", TicketHandler.class);
        routeMap.put("/json/tickets/{ticketId}", TicketHandler.class);

        routeMap.put("/json/ticketTypes", TicketTypesHandler.class);
        routeMap.put("/json/ticketTypes/{ticketType}", TicketTypesHandler.class);
        routeMap.put("/json/ticketSubtotal", TicketSubtotalHandler.class);
        routeMap.put("/json/ticketsCallback", TicketsCallbackHandler.class);

        routeMap.put("startsWith:/pages", FileServerHandler.class);
        routeMap.put("startsWith:/talk", FileServerHandler.class);
        routeMap.put("startsWith:/tickets", FileServerHandler.class);
        routeMap.put("startsWith:/schedule", FileServerHandler.class);
        routeMap.put("startsWith:/venue", FileServerHandler.class);
        routeMap.put("startsWith:/organizers", FileServerHandler.class);
        routeMap.put("startsWith:/partners", FileServerHandler.class);
        routeMap.put("startsWith:/registerTalk", FileServerHandler.class);
        routeMap.put("startsWith:/munich", FileServerHandler.class);
        routeMap.put("startsWith:/profile", FileServerHandler.class);

        routeMap.put("/json/uploadPhoto", UploadEmberfestPhotoHandler.class);
    }

    @Override
    public LinkedHashMap<String,Class<? extends ChannelHandler>> getRoutes() {
        return routeMap;
    }

    @Override
    public Class<? extends ChannelHandler> getHandlerForRoute(String route) {
        return routeMap.get(route);
    }

    @Override
    public Map<String, String> getPlurals() {
        return null;
    }
}
