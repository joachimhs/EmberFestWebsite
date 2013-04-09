package no.haagensoftware.netty.webserver.handler;

import java.util.List;

import no.haagensoftware.auth.MozillaPersonaCredentials;
import no.haagensoftware.netty.webserver.AuthenticationContext;
import no.haagensoftware.netty.webserver.AuthenticationResult;
import no.haagensoftware.netty.webserver.SubmittedTalk;
import no.haagensoftware.perst.PerstDBEnv;
import no.haagensoftware.perst.dao.PerstAbstractDao;
import no.haagensoftware.perst.datatypes.PerstAbstract;
import no.haagensoftware.perst.datatypes.PerstUser;

import org.apache.log4j.Logger;
import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.MessageEvent;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class TalksHandler extends FileServerHandler {
	private static Logger logger = Logger.getLogger(CredentialsHandler.class.getName());
	
	private AuthenticationContext authenticationContext;
	private PerstDBEnv dbEnv;
	private PerstAbstractDao abstractDao;
	
	public TalksHandler(String path, AuthenticationContext authenticationContext, PerstDBEnv dbEnv) {
		super(path);
		this.authenticationContext = authenticationContext;
		this.dbEnv = dbEnv;
		this.abstractDao = new PerstAbstractDao();
	}
	
	@Override
	public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) throws Exception {
	
		String uri = getUri(e);
		String cookieUuidToken = getCookieValue(e, "uuidToken");
		AuthenticationResult cachedUserResult = null;
		if (cookieUuidToken != null) {
			cachedUserResult = authenticationContext.verifyUUidToken(cookieUuidToken);
		}
		String responseContent = "";
		
		if (isGet(e)) {
			List<PerstAbstract> talks = abstractDao.getAbstracts(dbEnv);
			logger.info("Submitted abstracts: ");
			StringBuffer sb = new StringBuffer();
			JsonArray abstarctsArray = new JsonArray();
			
			for (PerstAbstract talk : talks) {
				logger.info(talk.getAbstractTitle());
				JsonObject talkJson = new JsonObject();
				talkJson.addProperty("id", talk.getAbstractId());
				talkJson.addProperty("talkTitle", talk.getAbstractTitle());
				talkJson.addProperty("talkText", talk.getAbstractContent());
				talkJson.addProperty("talkTopics", talk.getAbstractTopics());
				talkJson.addProperty("talkType", talk.getAbstractType());
				
				PerstUser user = authenticationContext.getUser(talk.getUserId());
				
				talkJson.addProperty("talkSuggestedBy", user.getFirstName() + " " + user.getLastName());
				abstarctsArray.add(talkJson);
			}
			
			JsonObject topObject = new JsonObject();
			topObject.add("abstracts", abstarctsArray);
			
			responseContent = topObject.toString();
		} else if (isPost(e)) {
			String messageContent = getHttpMessageContent(e);
			
			if (cachedUserResult != null && cachedUserResult.isUuidValidated() && cachedUserResult.getUuidToken() != null) {
				SubmittedTalk submittedTalk = new Gson().fromJson(messageContent, SubmittedTalk.class);
				MozillaPersonaCredentials cred = authenticationContext.getAuthenticatedUser(cachedUserResult.getUuidToken());
				if (submittedTalk != null && cred != null) {
					PerstAbstract newAbstract = new PerstAbstract();
					newAbstract.setAbstractId(submittedTalk.getTalkId());
					newAbstract.setAbstractTitle(submittedTalk.getTalkTitle());
					newAbstract.setAbstractContent(submittedTalk.getTalkText());
					newAbstract.setAbstractType(submittedTalk.getTalkType());
					newAbstract.setAbstractTopics(submittedTalk.getTalkTopics());
					newAbstract.setUserId(cred.getEmail());
					
					abstractDao.persistAbstract(dbEnv, newAbstract);
					responseContent = "{\"submitted\": true}";
				} else {
					responseContent = "{\"submitted\": false, \"error\": \"Unable to parse submitted talk\"}";
				}
			} else {
				responseContent = "{\"submitted\": false, \"error\": \"User not authenticated\"}";
			}
		}
		
		logger.info("responseContent: " + responseContent);
		logger.info("coookieUuidToken " + cookieUuidToken);
		writeContentsToBuffer(ctx, responseContent, "text/json");
	}
}
