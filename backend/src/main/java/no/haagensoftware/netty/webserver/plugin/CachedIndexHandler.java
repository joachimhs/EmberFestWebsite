package no.haagensoftware.netty.webserver.plugin;

import static org.jboss.netty.handler.codec.http.HttpHeaders.isKeepAlive;
import static org.jboss.netty.handler.codec.http.HttpHeaders.setContentLength;
import static org.jboss.netty.handler.codec.http.HttpMethod.GET;
import static org.jboss.netty.handler.codec.http.HttpResponseStatus.METHOD_NOT_ALLOWED;
import static org.jboss.netty.handler.codec.http.HttpResponseStatus.OK;
import static org.jboss.netty.handler.codec.http.HttpVersion.HTTP_1_1;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import no.haagensoftware.netty.webserver.handler.FileServerHandler;
import no.haagensoftware.netty.webserver.scriptCache.ScriptCache;
import no.haagensoftware.netty.webserver.scriptCache.ScriptHash;

import org.apache.log4j.Logger;
import org.jboss.netty.buffer.ChannelBuffer;
import org.jboss.netty.buffer.ChannelBuffers;
import org.jboss.netty.channel.ChannelFuture;
import org.jboss.netty.channel.ChannelFutureListener;
import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.MessageEvent;
import org.jboss.netty.handler.codec.http.DefaultHttpResponse;
import org.jboss.netty.handler.codec.http.HttpHeaders;
import org.jboss.netty.handler.codec.http.HttpRequest;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * This class is responsible for caching the /index.html file along with any of the
 * JavaScript files contained within the head-tag. Any <script src="..."/> within the 
 * head-tag is replaced with a single script tag with src="index.html.js". The contents
 * of index.html.js is served via the URL /cachedScript/index.html.js via the 
 * CachedScriptHandler class. 
 * 
 * This class can be easily extended to supply scripts from different paths. 
 * 
 * @author joahaa
 *
 */
public class CachedIndexHandler extends FileServerHandler {
	private static Logger logger = Logger.getLogger(CachedIndexHandler.class.getName());
	private int maxCacheSeconds;
	
	public CachedIndexHandler(String rootPath, int maxCacheSeconds) {
		super(rootPath);
		this.maxCacheSeconds = maxCacheSeconds;
	}
	
	@Override
	public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) throws Exception {
		HttpRequest request = (HttpRequest) e.getMessage();
        if (request.getMethod() != GET) {
            sendError(ctx, METHOD_NOT_ALLOWED);
            return;
        }
        
        //For the Cached Index Handler, we are always serving /index.html with the
        //content type text/html
        String path = "/index.html";
        String contentType = "text/html";
        
        ScriptCache cache = ScriptHash.getScriptCache(path);
        if (cache == null || cache.isExpired()) {
        	//If file is not cached, or cache is expired, update the cache.
        	logger.info("Updating index.html from filesystem path: " + path);
        	cache = updateScriptCacheForPath(path);
        } 
        
        String htmlContents = cache.getHtmlContents();
        
        DefaultHttpResponse response = new DefaultHttpResponse(HTTP_1_1, OK);;
        response.setHeader(HttpHeaders.Names.CONTENT_TYPE, contentType);
        setContentLength(response, htmlContents.length());

        response.setContent(ChannelBuffers.copiedBuffer(htmlContents, "utf-8"));
        ChannelFuture writeFuture = e.getChannel().write(response);

        // Decide whether to close the connection or not.
        if (!isKeepAlive(request)) {
            // Close the connection when the whole content is written out.
            writeFuture.addListener(ChannelFutureListener.CLOSE);
        }
	}
	
	private ScriptCache updateScriptCacheForPath(String path) throws IOException {
		Long before = System.currentTimeMillis();
		StringBuffer scriptContentsCombined = new StringBuffer();
		List<String> scriptPathList = new ArrayList<String>();
		
		Document htmlDocument = parseHtmlPage(path);
		
		//extract out the JavaScript tags with src attribute and replace with a single
		//call to a cahced minified script file
		if (htmlDocument != null) {
			Elements elements = htmlDocument.select("head");
			Element headElement = elements.get(0);
			
			Elements scriptElements = headElement.getElementsByTag("script");
			for (Element scriptElement : scriptElements) {
				String scriptSrc = scriptElement.attr("src");
				if (scriptSrc == null || scriptSrc.startsWith("http")) {
					//Keep the script as-is
				} else if (scriptSrc != null && scriptSrc.endsWith(".js")) {
					//cache and remove this <script src tag from the DOM 
					ChannelBuffer cb = getFileContent(scriptSrc);
					scriptContentsCombined.append(cb.toString(Charset.defaultCharset())).append("\r\n\r\n");
					scriptPathList.add(scriptSrc);
					scriptElement.remove();
				}
			}
			
			//Append a new script element to the head-tag representing the cached and
			//minified script
			headElement.appendElement("script")
				.attr("src", "/cachedScript" + path + ".js")
				.attr("type", "text/javascript")
				.attr("charset", "utf-8");
		}
		
		//Create or update the script contents for this HTML file path
		String scriptsCombined = scriptContentsCombined.toString(); 
		ScriptCache cache = ScriptHash.updateScriptContents(path, scriptPathList, scriptsCombined, htmlDocument.html(), System.currentTimeMillis() + (maxCacheSeconds * 1000));
		logger.info("Finished extracting script contents took: " + (System.currentTimeMillis() - before) + " ms.");
		
		return cache;
	}

	/**
	 * Simple method for parsing the HTML contents
	 * 
	 * @param path
	 * @return
	 * @throws IOException
	 */
	private Document parseHtmlPage(String path) throws IOException {
		Document htmlDocument = null;
		
		File input = new File(this.getRootPath() + path);
		if (input != null && input.exists() && input.isFile()) {
			htmlDocument = Jsoup.parse(input, "UTF-8");
		}
		return htmlDocument;
	}
}
