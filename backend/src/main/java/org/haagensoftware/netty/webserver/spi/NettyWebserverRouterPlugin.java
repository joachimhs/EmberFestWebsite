package org.haagensoftware.netty.webserver.spi;

import java.util.LinkedHashMap;
import java.util.List;

import no.haagensoftware.netty.webserver.ServerInfo;

import org.jboss.netty.channel.ChannelHandler;
import org.jboss.netty.channel.SimpleChannelUpstreamHandler;

public abstract class NettyWebserverRouterPlugin {

	public abstract LinkedHashMap<String, SimpleChannelUpstreamHandler> getRoutes();
	
	public abstract ChannelHandler getHandlerForRoute(String route);
	
	public abstract void setServerInfo(ServerInfo serverInfo);
}
