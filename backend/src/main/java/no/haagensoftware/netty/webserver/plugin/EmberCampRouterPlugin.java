package no.haagensoftware.netty.webserver.plugin;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.LinkedHashMap;
import java.util.List;

import no.haagensoftware.auth.MozillaPersonaCredentials;
import no.haagensoftware.netty.webserver.AuthenticationContext;
import no.haagensoftware.netty.webserver.ServerInfo;
import no.haagensoftware.netty.webserver.handler.CredentialsHandler;
import no.haagensoftware.netty.webserver.handler.FileServerHandler;
import no.haagensoftware.netty.webserver.handler.TalksHandler;
import no.haagensoftware.perst.PerstDBEnv;

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
	private AuthenticationContext authenticationContext;
	
	public EmberCampRouterPlugin(ServerInfo serverInfo, PerstDBEnv dbEnv) {
		authenticationContext = new AuthenticationContext(dbEnv);
		
		routes = new LinkedHashMap<String, SimpleChannelUpstreamHandler>();
		routes.put("equals:/index.html", new CachedIndexHandler(serverInfo.getWebappPath(), 0));
        routes.put("equals:/", new CachedIndexHandler(serverInfo.getWebappPath(), 0));
        routes.put("startsWith:/pages/", new CachedIndexHandler(serverInfo.getWebappPath(), 0));
        routes.put("startsWith:/register", new CachedIndexHandler(serverInfo.getWebappPath(), 0));
        routes.put("startsWith:/call_for_speakers", new CachedIndexHandler(serverInfo.getWebappPath(), 0));
        routes.put("startsWith:/talks", new CachedIndexHandler(serverInfo.getWebappPath(), 0));
        
        routes.put("startsWith:/auth/login", new CredentialsHandler(serverInfo.getWebappPath(), authenticationContext, dbEnv));
        routes.put("startsWith:/auth/logout", new CredentialsHandler(serverInfo.getWebappPath(), authenticationContext, dbEnv));
        routes.put("startsWith:/auth/registerNewUser", new CredentialsHandler(serverInfo.getWebappPath(), authenticationContext, dbEnv));
        
        routes.put("startsWith:/abstracts", new TalksHandler(serverInfo.getWebappPath(), authenticationContext, dbEnv));
        
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
