package no.haagensoftware.kontize.handler;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;
import no.haagensoftware.contentice.handler.ContenticeHandler;
import no.haagensoftware.kontize.db.dao.UserDao;
import no.haagensoftware.kontize.models.AuthenticationResult;
import no.haagensoftware.kontize.models.Cookie;
import no.haagensoftware.kontize.models.MozillaPersonaCredentials;
import no.haagensoftware.kontize.models.User;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.log4j.Logger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

/**
 * Created by jhsmbp on 1/24/14.
 */
public class CredentialsHandler extends ContenticeHandler {
    private static final Logger logger = Logger.getLogger(CredentialsHandler.class.getName());
    private UserDao userDao = null;

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, FullHttpRequest fullHttpRequest) throws Exception {
        if (userDao == null) {
            userDao = new UserDao(getStorage());
        }
        String responseContent = "";
        String uri = getUri(fullHttpRequest);
        String cookieUuidToken = getCookieValue(fullHttpRequest, "uuidToken");
        Cookie cachedCookie = null;
        User loggedInUser = null;

        AuthenticationContext authenticationContext = AuthenticationContext.getInstance(getStorage());

        if (cookieUuidToken != null) {
            //cookie based validation
            cachedCookie = userDao.getCookie(getDomain().getWebappName(), cookieUuidToken);
        }

        if (cachedCookie != null) {
            String userId = cachedCookie.getUserId();
            loggedInUser = userDao.getUser(getDomain().getWebappName(), userId);
        }

        if (isPost(fullHttpRequest) && uri.equals("/auth/login")) {
            String messageContent = getHttpMessageContent(fullHttpRequest);

            if (cachedCookie != null && loggedInUser != null && cachedCookie.getUserId() != null) {
                logger.info("Logging in via Cookie for " + cachedCookie.getUserId() + " automatically, without Persona.");

                cachedCookie.setCreated(System.currentTimeMillis());
                userDao.persistCookie(getDomain().getWebappName(), cachedCookie);
                responseContent = "{ \"uuidToken\": \"" + cachedCookie.getId() + "\", \"authLevel\": \"" + authenticationContext.getUserAuthLevel(getDomain().getWebappName(), cachedCookie.getId(), loggedInUser.getUserId()) + "\"}";
            } else {
                logger.info("Logging in via Persona.");

                responseContent = loginViaMozillaPersona(responseContent, messageContent);

                MozillaPersonaCredentials credentials = new Gson().fromJson(responseContent, MozillaPersonaCredentials.class);
                AuthenticationResult authResult = authenticationContext.verifyAndGetUser(getDomain().getWebappName(), credentials);

                loggedInUser = userDao.getUser(getDomain().getWebappName(), credentials.getEmail());

                if (loggedInUser != null && authResult.getUuidToken() != null && authResult.isUuidValidated()) {
                    responseContent = "{ \"uuidToken\": \"" + authResult.getUuidToken() + "\", \"authLevel\": \"" + authenticationContext.getUserAuthLevel(getDomain().getWebappName(), authResult.getUuidToken(), credentials.getEmail()) + "\"}";
                } else if (loggedInUser != null && authResult.getUuidToken() != null && !authResult.isUuidValidated()) {
                    responseContent = "{ \"uuidToken\": \"" + authResult.getUuidToken() + "\", \"authLevel\": \"" + authenticationContext.getUserAuthLevel(getDomain().getWebappName(), authResult.getUuidToken(), credentials.getEmail()) + "\"}";
                } else {
                    responseContent = "{ \"authFailed\": true, \"error\": \"" + authResult.getStatusMessage() + "\", \"uuidToken:\": \"" + authResult.getUuidToken() + "\" }";
                }
            }
        } else if (isPost(fullHttpRequest) && uri.equals("/auth/logout")) {
            if (cookieUuidToken != null) {
                authenticationContext.logUserOut(getDomain().getWebappName(), cookieUuidToken);
            }
            responseContent = "{}";
        }

        logger.info("responseContent: " + responseContent);
        logger.info("coookieUuidToken " + cookieUuidToken);

        writeContentsToBuffer(channelHandlerContext, responseContent, "application/json");
    }

    private String loginViaMozillaPersona(String responseContent,
                                          String messageContent) throws UnsupportedEncodingException,
            IOException, ClientProtocolException {

        JsonObject assertionJson = new JsonObject();
        if (messageContent.startsWith("assertion=")) {
            messageContent = messageContent.substring(10, messageContent.length());
        }
        assertionJson.addProperty("assertion", messageContent);
        assertionJson.addProperty("audience", System.getProperty("eu.emberfest.personaAudience", "localhost:8081"));

        int statusCode = -1;
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();

        HttpPost httpPost = new HttpPost("https://verifier.login.persona.org/verify");
        System.out.println(assertionJson.toString());
        StringEntity requestEntity = new StringEntity(assertionJson.toString(), "UTF-8");
        //requestEntity.setContentType("application/x-www-form-urlencoded");
        requestEntity.setContentType("application/json");

        httpPost.setEntity(requestEntity);
        CloseableHttpResponse response = httpClient.execute(httpPost);
        statusCode = response.getStatusLine().getStatusCode();

        BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

        String line = "";
        while ((line = rd.readLine()) != null) {
            responseContent = line + "\n";
        }
        return responseContent;
    }
}
