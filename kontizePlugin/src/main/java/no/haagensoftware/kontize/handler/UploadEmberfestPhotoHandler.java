package no.haagensoftware.kontize.handler;

import com.google.gson.JsonObject;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.*;
import io.netty.handler.codec.http.multipart.*;
import no.haagensoftware.contentice.data.SubCategoryData;
import no.haagensoftware.contentice.handler.ContenticeHandler;
import no.haagensoftware.kontize.models.AuthenticationResult;
import no.haagensoftware.kontize.models.User;
import org.apache.commons.fileupload.MultipartStream;
import org.apache.log4j.Logger;

import javax.xml.ws.handler.Handler;
import java.io.*;
import java.nio.charset.Charset;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Created by jhsmbp on 2/5/14.
 */
public class UploadEmberfestPhotoHandler extends ContenticeHandler {
    private static final Logger logger = Logger.getLogger(UploadEmberfestPhotoHandler.class.getName());

    private HttpRequest request;
    private HttpPostRequestDecoder decoder;
    private static final HttpDataFactory factory = new DefaultHttpDataFactory(DefaultHttpDataFactory.MINSIZE);

    private final StringBuilder responseContent = new StringBuilder();

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, FullHttpRequest fullHttpRequest) throws Exception {
        JsonObject jsonReturn = new JsonObject();

        String newFilename = null;
        AuthenticationContext authenticationContext = AuthenticationContext.getInstance(getStorage());

        String cookieUuidToken = getCookieValue(fullHttpRequest, "uuidToken");
        AuthenticationResult cachedUserResult = null;
        if (cookieUuidToken != null) {
            cachedUserResult = authenticationContext.verifyUUidToken(getDomain().getWebappName(), cookieUuidToken);
            logger.info("cachedUserResult: " + cachedUserResult);
        }

        if (isPost(fullHttpRequest) && cachedUserResult != null && cachedUserResult.getUuidToken() != null && cachedUserResult.isUuidValidated()) {

            User user = authenticationContext.getUser(getDomain().getWebappName(), authenticationContext.getAuthenticatedUser(getDomain().getWebappName(), cachedUserResult.getUuidToken()).getUserId());

            try {
                decoder = new HttpPostRequestDecoder(factory, fullHttpRequest);
            } catch (HttpPostRequestDecoder.ErrorDataDecoderException e1) {
                e1.printStackTrace();
                responseContent.append(e1.getMessage());
                channelHandlerContext.channel().close();
                return;
            }

            if (decoder != null) {
                HttpContent chunk = fullHttpRequest.duplicate();
                try {
                    decoder.offer(chunk);
                } catch (HttpPostRequestDecoder.ErrorDataDecoderException e1) {
                    e1.printStackTrace();
                    responseContent.append(e1.getMessage());
                    return;
                }

                // example of reading chunk by chunk (minimize memory usage due to
                // Factory)
                newFilename = readHttpDataChunkByChunk(getDomain().getWebappName());

                logger.info("newFilename: " + newFilename + " user: " + user);
                if (newFilename != null && user != null) {
                    logger.info("Adding photo to user: " + newFilename + " :: " + user.getUserId());
                    user.setPhoto(newFilename);
                    jsonReturn.addProperty("filename", newFilename);
                    authenticationContext.persistUser(getDomain().getWebappName(), user);
                }
            }
        }

        writeContentsToBuffer(channelHandlerContext, jsonReturn.toString(), "application/json");
    }

    /**
     * Example of reading request by chunk and getting values from chunk to chunk
     */
    private String readHttpDataChunkByChunk(String host) {
        String newFilename = null;

        try {
            while (decoder.hasNext()) {
                InterfaceHttpData data = decoder.next();
                if (data != null) {
                    try {
                        // new value
                        newFilename = writeHttpData(host, data);
                    } finally {
                        data.release();
                    }
                }
            }
        } catch (HttpPostRequestDecoder.EndOfDataDecoderException e1) {

        }

        return newFilename;
    }

    private String writeHttpData(String host, InterfaceHttpData data) {
        String newFilename = null;

        if (data.getHttpDataType() == InterfaceHttpData.HttpDataType.FileUpload) {
            FileUpload fileUpload = (FileUpload) data;
            String fileending = getFileEnding(fileUpload);

            if (fileUpload.isCompleted() && fileending != null) {
                try {
                    String uuidFile = UUID.randomUUID().toString().replaceAll("-","") + fileending;

                    String filename = System.getProperty("no.haagensoftware.contentice.webappDir") + "/" + host +  "/uploads/" + uuidFile;

                    fileUpload.renameTo(new File(filename));

                    if (Files.exists(FileSystems.getDefault().getPath(filename))) {
                        newFilename = uuidFile;
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return newFilename;
    }

    public String getFileEnding(FileUpload fileUpload) {
        String fileEnding = null;

        if (fileUpload.getContentType().equalsIgnoreCase("image/png")) {
            fileEnding = ".png";
        }

        if (fileUpload.getContentType().equalsIgnoreCase("image/jpg")) {
            fileEnding = ".jpg";
        }

        if (fileUpload.getContentType().equalsIgnoreCase("image/jpeg")) {
            fileEnding = ".jpg";
        }

        return fileEnding;
    }
}
