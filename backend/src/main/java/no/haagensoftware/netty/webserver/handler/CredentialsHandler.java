package no.haagensoftware.netty.webserver.handler;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import no.haagensoftware.auth.MozillaPersonaCredentials;
import no.haagensoftware.datatypes.Cookie;
import no.haagensoftware.datatypes.User;
import no.haagensoftware.netty.webserver.AuthenticationContext;
import no.haagensoftware.netty.webserver.AuthenticationResult;

import no.haagensoftware.db.DbEnv;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.log4j.Logger;
import org.haagensoftware.netty.webserver.spi.PropertyConstants;
import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.MessageEvent;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class CredentialsHandler extends FileServerHandler {
	private static Logger logger = Logger.getLogger(CredentialsHandler.class.getName());
	
	private AuthenticationContext authenticationContext;
	private DbEnv dbEnv;
	
	
	public CredentialsHandler(String path, AuthenticationContext authenticationContext, DbEnv dbEnv) {
		super(path);
		this.authenticationContext = authenticationContext;
		this.dbEnv = dbEnv;
	}
	
	@Override
	public void messageReceived(ChannelHandlerContext ctx, MessageEvent e)
			throws Exception {

        String responseContent = "";
		String uri = getUri(e);
		String cookieUuidToken = getCookieValue(e, "uuidToken");
        Cookie cachedCookie = null;
        User loggedInUser = null;

		if (cookieUuidToken != null) {
            //cookie based validation
            cachedCookie = dbEnv.getUserDao().getCookie(cookieUuidToken);
        }

        if (cachedCookie != null) {
            String userId = cachedCookie.getUserId();
            loggedInUser = dbEnv.getUserDao().getUser(userId);
        }

        if (isPost(e) && uri.equals("/auth/login")) {
            String messageContent = getHttpMessageContent(e);

            if (cachedCookie != null && loggedInUser != null && cachedCookie.getUserId() != null) {
                logger.info("Logging in via Cookie for " + cachedCookie.getUserId() + " automatically, without Persona.");

                cachedCookie.setCreated(System.currentTimeMillis());
                dbEnv.getUserDao().persistCookie(cachedCookie);
                responseContent = "{ \"uuidToken\": \"" + cachedCookie.getId() + "\", \"authLevel\": \"" + authenticationContext.getUserAuthLevel(cachedCookie.getId(), loggedInUser.getUserId()) + "\"}";
            } else {
                logger.info("Logging in via Persona.");

                responseContent = loginViaMozillaPersona(responseContent, messageContent);

                MozillaPersonaCredentials credentials = new Gson().fromJson(responseContent, MozillaPersonaCredentials.class);
                AuthenticationResult authResult = authenticationContext.verifyAndGetUser(credentials);

                loggedInUser = dbEnv.getUserDao().getUser(credentials.getEmail());

                if (loggedInUser != null && authResult.getUuidToken() != null && authResult.isUuidValidated()) {
                    responseContent = "{ \"uuidToken\": \"" + authResult.getUuidToken() + "\", \"authLevel\": \"" + authenticationContext.getUserAuthLevel(authResult.getUuidToken(), credentials.getEmail()) + "\"}";
                } else if (loggedInUser != null && authResult.getUuidToken() != null && !authResult.isUuidValidated()) {
                    responseContent = "{ \"uuidToken\": \"" + authResult.getUuidToken() + "\", \"authLevel\": \"" + authenticationContext.getUserAuthLevel(authResult.getUuidToken(), credentials.getEmail()) + "\"}";
                } else {
                    responseContent = "{ \"authFailed\": true, \"error\": \"" + authResult.getStatusMessage() + "\" }";
                }
            }
        } else if (isPost(e) && uri.equals("/auth/logout")) {
            if (cookieUuidToken != null) {
                authenticationContext.logUserOut(cookieUuidToken);
            }
        }

        logger.info("responseContent: " + responseContent);
        logger.info("coookieUuidToken " + cookieUuidToken);

		writeContentsToBuffer(ctx, responseContent, "text/json");
	}

	private String loginViaMozillaPersona(String responseContent,
			String messageContent) throws UnsupportedEncodingException,
			IOException, ClientProtocolException {
		
		JsonObject assertionJson = new JsonObject();
		if (messageContent.startsWith("assertion=")) {
			messageContent = messageContent.substring(10, messageContent.length());
		}
		assertionJson.addProperty("assertion", messageContent);
		assertionJson.addProperty("audience", System.getProperty(PropertyConstants.PERSONA_AUDIENCE, "localhost:8081"));
		
		int statusCode = -1;
		DefaultHttpClient httpclient = new DefaultHttpClient();
		
		HttpPost httpPost = new HttpPost("https://verifier.login.persona.org/verify");
		System.out.println(assertionJson.toString());
		StringEntity requestEntity = new StringEntity(assertionJson.toString(), "UTF-8");
		//requestEntity.setContentType("application/x-www-form-urlencoded");
		requestEntity.setContentType("application/json");

		httpPost.setEntity(requestEntity);
		HttpResponse response = httpclient.execute(httpPost);
		statusCode = response.getStatusLine().getStatusCode();

		BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
		
		String line = "";
		while ((line = rd.readLine()) != null) {
		  responseContent = line + "\n";
		}
		return responseContent;
	}	
}
