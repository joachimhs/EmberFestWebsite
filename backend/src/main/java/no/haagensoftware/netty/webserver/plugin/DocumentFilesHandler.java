package no.haagensoftware.netty.webserver.plugin;

import com.google.gson.Gson;
import no.haagensoftware.netty.webserver.handler.FileServerHandler;
import org.apache.log4j.Logger;
import org.haagensoftware.netty.webserver.util.ContentTypeUtil;
import org.jboss.netty.buffer.ChannelBuffer;
import org.jboss.netty.channel.*;
import org.jboss.netty.handler.codec.http.DefaultHttpResponse;
import org.jboss.netty.handler.codec.http.HttpHeaders;
import org.jboss.netty.handler.codec.http.HttpRequest;

import static org.jboss.netty.handler.codec.http.HttpHeaders.isKeepAlive;
import static org.jboss.netty.handler.codec.http.HttpHeaders.setContentLength;
import static org.jboss.netty.handler.codec.http.HttpMethod.GET;
import static org.jboss.netty.handler.codec.http.HttpResponseStatus.*;
import static org.jboss.netty.handler.codec.http.HttpVersion.HTTP_1_1;

/**
 * Created with IntelliJ IDEA.
 * User: joahaa
 * Date: 2/18/13
 * Time: 9:22 PM
 * To change this template use File | Settings | File Templates.
 */
public class DocumentFilesHandler extends FileServerHandler {
    private static Logger logger = Logger.getLogger(DocumentFilesHandler.class.getName());

    public DocumentFilesHandler(String path) {
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

        String path = sanitizeUri(uri);
        if (path == null) {
            sendError(ctx, FORBIDDEN);
            return;
        }

        logger.info("Path: " + path);
        if (path.startsWith("/doc_admins")) {
            path = path.substring(11);
        }

        String returnString = "";

        if (path.length() == 0) {
            //DocAdmin
        } else {
            String content = getRawFileContent(path);
            if (content == null) {
                logger.info("Unable to find file at path: " + path);
                sendError(ctx, NOT_FOUND);
                return;
            }

            DocAdmin document = new DocAdmin(path, content);
            returnString = new Gson().toJson(document);
        }

        writeContentsToBuffer(ctx, returnString, "text/json");
    }

    class DocAdmin {
        String id;
        String text;

        public DocAdmin(String id, String text) {
            this.id = id;
            this.text = text;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
    }
}
