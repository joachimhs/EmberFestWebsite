package no.haagensoftware.netty.webserver.plugin;

import static org.jboss.netty.handler.codec.http.HttpHeaders.isKeepAlive;
import static org.jboss.netty.handler.codec.http.HttpHeaders.setContentLength;
import static org.jboss.netty.handler.codec.http.HttpMethod.GET;
import static org.jboss.netty.handler.codec.http.HttpResponseStatus.FORBIDDEN;
import static org.jboss.netty.handler.codec.http.HttpResponseStatus.METHOD_NOT_ALLOWED;
import static org.jboss.netty.handler.codec.http.HttpResponseStatus.OK;
import static org.jboss.netty.handler.codec.http.HttpResponseStatus.NOT_FOUND;
import static org.jboss.netty.handler.codec.http.HttpVersion.HTTP_1_1;

import org.apache.log4j.Logger;
import no.haagensoftware.netty.webserver.scriptCache.ScriptCache;
import no.haagensoftware.netty.webserver.scriptCache.ScriptHash;
import org.jboss.netty.buffer.ChannelBuffers;
import org.jboss.netty.channel.ChannelFuture;
import org.jboss.netty.channel.ChannelFutureListener;
import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.MessageEvent;
import org.jboss.netty.handler.codec.http.DefaultHttpResponse;
import org.jboss.netty.handler.codec.http.HttpHeaders;
import org.jboss.netty.handler.codec.http.HttpRequest;

import no.haagensoftware.netty.webserver.handler.FileServerHandler;

/**
 * This class is responsible for serving cached content. The contents is cached by the
 * CachedIndexHandler class. 
 * @author joahaa
 *
 */
public class CachedScriptHandler extends FileServerHandler {
	private static Logger logger = Logger.getLogger(CachedScriptHandler.class.getName());
	
	public CachedScriptHandler(String path) {
		super(path);
	}

	@Override
	public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) throws Exception {
		HttpRequest request = (HttpRequest) e.getMessage();
        if (request.getMethod() != GET) {
            sendError(ctx, METHOD_NOT_ALLOWED);
            return;
        }
        
        String uri = request.getUri();
        if (uri.startsWith("/cachedScript")) {
            uri = uri.substring(13);
        }
        logger.info("CachedScriptHandler uri: " + uri);
        
        String path = sanitizeUri(uri);
        if (path == null) {
            sendError(ctx, FORBIDDEN);
            return;
        }
        
        //Substring out the root path
        if (path.startsWith(getRootPath())) {
        	path = path.substring(getRootPath().length());
        }
        
        //Substring ut the .js ending
        if (path.endsWith(".js")) {
        	path = path.substring(0, path.length() - 3);
        }
        
        logger.info("CachedScriptHandler path: " + path);
        
        ScriptCache scriptCache = ScriptHash.getScriptCache(path);
        //if there is no cache at the path, return a 404.
        if (scriptCache == null) {
        	sendError(ctx, NOT_FOUND);
        	return;
        }
		
        //Set up and send the response.
		DefaultHttpResponse response = new DefaultHttpResponse(HTTP_1_1, OK);;
        response.setHeader(HttpHeaders.Names.CONTENT_TYPE, "application/javascript");
        setContentLength(response, scriptCache.getMinifiedScriptContents().length());

        response.setContent(ChannelBuffers.copiedBuffer(scriptCache.getMinifiedScriptContents(), "utf-8"));
        ChannelFuture writeFuture = e.getChannel().write(response);

        // Decide whether to close the connection or not.
        if (!isKeepAlive(request)) {
            // Close the connection when the whole content is written out.
            writeFuture.addListener(ChannelFutureListener.CLOSE);
        }
	}
}
