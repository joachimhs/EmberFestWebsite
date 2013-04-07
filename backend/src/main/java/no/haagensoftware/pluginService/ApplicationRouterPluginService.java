package no.haagensoftware.pluginService;

import java.util.ArrayList;
import java.util.List;
import java.util.ServiceLoader;

import org.apache.log4j.Logger;
import org.haagensoftware.netty.webserver.spi.NettyWebserverRouterPlugin;

public class ApplicationRouterPluginService {
	private static Logger logger = Logger.getLogger(ApplicationRouterPluginService.class.getName());
	private static ApplicationRouterPluginService pluginService = null;
	private ServiceLoader<NettyWebserverRouterPlugin> loader;
	
	public ApplicationRouterPluginService() {		
		loader = ServiceLoader.load(NettyWebserverRouterPlugin.class);
		for (NettyWebserverRouterPlugin routerPlugin : loader) {
			logger.info("Initializing NettyWebserverRouterPlugin for routes: " + routerPlugin.getRoutes());
			routerPlugin.setServerInfo(new ApplicationServerInfo());
		}
	}
	
	public List<NettyWebserverRouterPlugin> getRouterPlugins() {
		List<NettyWebserverRouterPlugin> pluginList = new ArrayList<>();
		
		for (NettyWebserverRouterPlugin routerPlugin : loader) {
			pluginList.add(routerPlugin);
		}
		
		return pluginList;
	}
}
