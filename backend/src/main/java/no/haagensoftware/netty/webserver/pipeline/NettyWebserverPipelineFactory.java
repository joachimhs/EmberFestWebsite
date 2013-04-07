package no.haagensoftware.netty.webserver.pipeline;

import java.io.File;
import java.util.LinkedHashMap;
import java.util.List;

import no.haagensoftware.netty.webserver.handler.CacheableFileServerHandler;
import no.haagensoftware.netty.webserver.handler.FileServerHandler;
import no.haagensoftware.netty.webserver.handler.RouterHandler;

import org.apache.log4j.Logger;
import org.haagensoftware.netty.webserver.spi.NettyWebserverRouterPlugin;
import org.haagensoftware.netty.webserver.spi.PropertyConstants;
import org.haagensoftware.netty.webserver.util.IntegerParser;
import org.jboss.netty.channel.ChannelHandler;
import org.jboss.netty.channel.ChannelPipeline;
import org.jboss.netty.channel.ChannelPipelineFactory;
import org.jboss.netty.channel.Channels;
import org.jboss.netty.handler.codec.compression.ZlibDecoder;
import org.jboss.netty.handler.codec.compression.ZlibEncoder;
import org.jboss.netty.handler.codec.compression.ZlibWrapper;
import org.jboss.netty.handler.codec.http.HttpChunkAggregator;
import org.jboss.netty.handler.codec.http.HttpContentCompressor;
import org.jboss.netty.handler.codec.http.HttpRequestDecoder;
import org.jboss.netty.handler.codec.http.HttpResponseEncoder;
import org.jboss.netty.handler.stream.ChunkedWriteHandler;

public class NettyWebserverPipelineFactory implements ChannelPipelineFactory {
	private static Logger logger = Logger.getLogger(NettyWebserverPipelineFactory.class.getName());
	private List<NettyWebserverRouterPlugin> routerPlugins;
	private RouterHandler routerhandler = null;
	
	public NettyWebserverPipelineFactory(List<NettyWebserverRouterPlugin> routerPlugins) {
		this.routerPlugins = routerPlugins;
	}
	@Override
	public ChannelPipeline getPipeline() throws Exception {
		String webappDir = System.getProperty(PropertyConstants.WEBAPP_DIR);

		ChannelPipeline pipeline = Channels.pipeline();

        // Uncomment the following line if you want HTTPS
        //SSLEngine engine = SecureChatSslContextFactory.getServerContext().createSSLEngine();
        //engine.setUseClientMode(false);
        //pipeline.addLast("ssl", new SslHandler(engine));

        pipeline.addLast("decoder", new HttpRequestDecoder());
        pipeline.addLast("aggregator", new HttpChunkAggregator(65536));
        pipeline.addLast("encoder", new HttpResponseEncoder());
        pipeline.addLast("gzip", new HttpContentCompressor(6));
        
        pipeline.addLast("chunkedWriter", new ChunkedWriteHandler());
        
        
        if (routerhandler == null) {
        	LinkedHashMap<String, ChannelHandler> routes = new LinkedHashMap<String, ChannelHandler>();
            
            for (NettyWebserverRouterPlugin routerPlugin : routerPlugins) {
            	for (String route : routerPlugin.getRoutes().keySet()) {
            		logger.info("Adding router for route: " + route);
            		routes.put(route, routerPlugin.getHandlerForRoute(route));
            	}
            }
            
            int scriptCacheSeconds = IntegerParser.parseIntegerFromString(System.getProperty(PropertyConstants.SCRIPTS_CACHE_SECONDS), 0);
            routerhandler = new RouterHandler(routes, false, new CacheableFileServerHandler(webappDir, scriptCacheSeconds));
        }
        
        
        pipeline.addLast("handler_routeHandler", routerhandler);

        return pipeline;
	}
}
