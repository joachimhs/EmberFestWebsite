package no.haagensoftware.netty.server;

import java.io.File;
import java.io.FileInputStream;
import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.Executors;

import no.haagensoftware.netty.webserver.pipeline.NettyWebserverPipelineFactory;
import no.haagensoftware.netty.webserver.plugin.EmberCampRouterPlugin;
import no.haagensoftware.perst.PerstDBEnv;
import no.haagensoftware.pluginService.ApplicationServerInfo;

import org.apache.log4j.Logger;
import org.haagensoftware.netty.webserver.spi.NettyWebserverRouterPlugin;
import org.haagensoftware.netty.webserver.spi.PropertyConstants;
import org.haagensoftware.netty.webserver.util.IntegerParser;
import org.jboss.netty.bootstrap.ServerBootstrap;
import org.jboss.netty.channel.socket.nio.NioServerSocketChannelFactory;

public class Main {
	private static Logger logger = Logger.getLogger(Main.class.getName());
	
	public static void main(String[] args) throws Exception{
		//new Main().run();
		configure();
		
		Main main = new Main();
		main.run();
	}
	
	private static void configure() throws Exception {
		Properties properties = new Properties();
		File configFile = new File("config.properties");
		if (!configFile.exists()) {
			configFile = new File("../config.properties");
		}
		if (!configFile.exists()) {
			configFile = new File("../../config.properties");
		}
		if (configFile.exists()) {
			FileInputStream configStream = new FileInputStream(configFile);
			properties.load(configStream);
			configStream.close();
			logger.info("Server properties loaded from " + configFile.getAbsolutePath());
			for (Enumeration<Object> e = properties.keys(); e.hasMoreElements();) {
				Object property = (String) e.nextElement();
				logger.info("\t\t* " + property + "=" + properties.get(property));
			}
		}
		
		setProperties(properties);
	}

	private static void setProperties(Properties properties) {
		Enumeration<Object> propEnum = properties.keys();
		while (propEnum.hasMoreElements()) {
			String property = (String) propEnum.nextElement();
			System.setProperty(property, properties.getProperty(property));
		}
		
		if (System.getProperty(PropertyConstants.DB_PATH) == null) {
			logger.error(" * Property '" + PropertyConstants.DB_PATH + "' is not specified. Configure in file config.properties. Halting Application");
			System.exit(-1);
		}
		
		if (System.getProperty(PropertyConstants.NETTY_PORT) == null) {
			System.setProperty(PropertyConstants.NETTY_PORT, "8080");
			logger.info(" * Property " + PropertyConstants.NETTY_PORT + " is not specified. Using default: 8080. Configure in file config.properties.");
		}
		
		if (System.getProperty(PropertyConstants.WEBAPP_DIR) == null) {
			System.setProperty(PropertyConstants.WEBAPP_DIR, "webapp");
			logger.info(" * Property '" + PropertyConstants.WEBAPP_DIR + "' is not specified. Using default: 'webapp' Configure in file config.properties.");
		}
		
		if (System.getProperty(PropertyConstants.SCRIPTS_CACHE_SECONDS) == null) {
			System.setProperty(PropertyConstants.SCRIPTS_CACHE_SECONDS, "0");
			logger.info(" * Property '" + PropertyConstants.SCRIPTS_CACHE_SECONDS + "' is not specified. Using default: '0' Configure in file config.properties.");
		}
	}
	
	public void run() throws Exception {
		String webappDir = System.getProperty(PropertyConstants.WEBAPP_DIR);
		System.setProperty("basedir", webappDir);
		
		PerstDBEnv dbEnv = new PerstDBEnv(System.getProperty(PropertyConstants.DB_PATH));
		dbEnv.initializeDbAtPath();
		
		List<NettyWebserverRouterPlugin> routerPlugins = new ArrayList<NettyWebserverRouterPlugin>();
		routerPlugins.add(new EmberCampRouterPlugin(new ApplicationServerInfo(), dbEnv));
		logger.info("Starting server: " + System.getProperty(PropertyConstants.NETTY_PORT));
				
		Integer port = IntegerParser.parseIntegerFromString(System.getProperty(PropertyConstants.NETTY_PORT), 8080);
		
        ServerBootstrap bootstrap = new ServerBootstrap(
                new NioServerSocketChannelFactory(
                        Executors.newCachedThreadPool(),
                        Executors.newCachedThreadPool()));

        
        
        NettyWebserverPipelineFactory nwpf = new NettyWebserverPipelineFactory(routerPlugins);
        // Set up the event pipeline factory          .
        bootstrap.setPipelineFactory(nwpf);

        // Bind and start to accept incoming connections.
        bootstrap.bind(new InetSocketAddress(port));
        
        logger.info("Started server on port: " + port + " hosting directory: " + webappDir);
    }
}
