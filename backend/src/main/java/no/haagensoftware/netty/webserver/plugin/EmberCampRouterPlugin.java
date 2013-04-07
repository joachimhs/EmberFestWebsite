package no.haagensoftware.netty.webserver.plugin;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import no.haagensoftware.netty.webserver.ServerInfo;
import no.haagensoftware.netty.webserver.handler.FileServerHandler;

import org.haagensoftware.netty.webserver.spi.NettyWebserverRouterPlugin;
import org.jboss.netty.channel.ChannelHandler;
import org.jboss.netty.channel.SimpleChannelUpstreamHandler;

/**
 * A simple router plugin to be able to serve the Haagen-Software.no website. 
 * @author joahaa
 *
 */
public class EmberCampRouterPlugin extends NettyWebserverRouterPlugin {
	private LinkedHashMap<String, SimpleChannelUpstreamHandler> routes;
	private ServerInfo serverInfo;
	
	public EmberCampRouterPlugin(ServerInfo serverInfo) {
		routes = new LinkedHashMap<String, SimpleChannelUpstreamHandler>();
		routes.put("equals:/index.html", new CachedIndexHandler(serverInfo.getWebappPath(), 0));
        routes.put("equals:/", new CachedIndexHandler(serverInfo.getWebappPath(), 0));
        routes.put("startsWith:/pages/", new CachedIndexHandler(serverInfo.getWebappPath(), 0));
        
        routes.put("startsWith:/stylesheets", new FileServerHandler(serverInfo.getWebappPath()));
        routes.put("startsWith:/img", new FileServerHandler(serverInfo.getWebappPath()));
        routes.put("startsWith:/mrkdwn", new FileServerHandler(serverInfo.getWebappPath()));
        
        routes.put("startsWith:/cachedScript", new CachedScriptHandler(serverInfo.getWebappPath()));
	}
	
	@Override
	public LinkedHashMap<String, SimpleChannelUpstreamHandler> getRoutes() {
		return routes;
	}

	@Override
	public ChannelHandler getHandlerForRoute(String route) {
        SimpleChannelUpstreamHandler handler = routes.get(route);

        if (handler == null) {
			handler = new CachedIndexHandler(serverInfo.getWebappPath(), 1);
		}

        return handler;
	}
	
	@Override
	public void setServerInfo(ServerInfo serverInfo) {
		

        
	}
}
