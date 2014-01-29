package no.haagensoftware.kontize.handler;

import com.google.gson.JsonPrimitive;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.multipart.Attribute;
import io.netty.handler.codec.http.multipart.DefaultHttpDataFactory;
import io.netty.handler.codec.http.multipart.HttpPostRequestDecoder;
import io.netty.handler.codec.http.multipart.InterfaceHttpData;
import no.haagensoftware.contentice.data.SubCategoryData;
import no.haagensoftware.contentice.handler.ContenticeHandler;
import no.haagensoftware.kontize.db.dao.TicketsDao;
import org.apache.commons.fileupload.MultipartStream;
import org.apache.log4j.Logger;

import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by jhsmbp on 1/28/14.
 */
public class TicketsCallbackHandler extends ContenticeHandler {
    private static final Logger logger = Logger.getLogger(TicketsCallbackHandler.class.getName());

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, FullHttpRequest fullHttpRequest) throws Exception {
        Map<String, String> formMap = new HashMap<>();

        String messageContent = getHttpMessageContent(fullHttpRequest);
        String contentType = getContentType(fullHttpRequest);

        int boundaryIndex = contentType.indexOf("boundary=");
        byte[] boundary = contentType.substring((boundaryIndex + 9)).getBytes();

        logger.info("boundary: " + contentType.substring((boundaryIndex + 9)));

        ByteArrayInputStream content = new ByteArrayInputStream(messageContent.getBytes());
        MultipartStream multipartStream = new MultipartStream(content, boundary);

        boolean nextPart = multipartStream.skipPreamble();
        while (nextPart) {
            String key = null;
            String value = null;

            String header = multipartStream.readHeaders();

            if (header.contains("name=")) {
                key = header.substring((header.indexOf("name=") + 6), header.length() - 2).trim();
                if (key.contains("\"")) {
                    key = key.replaceAll("\"", "");
                }
            }

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            multipartStream.readBodyData(outputStream);

            value = new String(outputStream.toByteArray()).trim();

            logger.info("key: '" + key + "' value: '" + value + "'");

            formMap.put(key, value);

            nextPart = multipartStream.readBoundary();
        }

        SubCategoryData order = null;

        String qpOrdernumber = formMap.get("ordernumber");
        if (qpOrdernumber != null) {
            order = getStorage().getSubCategory("orders", qpOrdernumber);
            if (order != null) {
                order.getKeyMap().put("qpOrdernumber", new JsonPrimitive(qpOrdernumber));
            }
        }

        for (String key : formMap.keySet()) {
            String value = formMap.get(key);
            order.getKeyMap().put(key, new JsonPrimitive(value));
        }

        String qpstat = formMap.get("qpstat");
        if (qpstat != null && qpstat.equals("000")) {
            order.getKeyMap().put("status", new JsonPrimitive("approved"));
        }

        getStorage().setSubCategory("orders", qpOrdernumber, order);

        writeContentsToBuffer(channelHandlerContext, "", "text/plain; charset=UTF-8");
    }
}
