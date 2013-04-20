package no.haagensoftware.netty.webserver.handler;

import java.util.List;

import no.haagensoftware.auth.MozillaPersonaCredentials;
import no.haagensoftware.leveldb.LevelDbEnv;
import no.haagensoftware.leveldb.dao.LevelDbAbstractDao;
import no.haagensoftware.netty.webserver.AuthenticationContext;
import no.haagensoftware.netty.webserver.AuthenticationResult;
import no.haagensoftware.netty.webserver.SubmittedTalk;
import no.haagensoftware.perst.PerstDBEnv;
import no.haagensoftware.perst.dao.PerstAbstractDao;
import no.haagensoftware.perst.datatypes.PerstAbstract;
import no.haagensoftware.perst.datatypes.PerstUser;
import no.haagensoftware.util.UriUtil;

import org.apache.log4j.Logger;
import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.MessageEvent;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class TalksHandler extends FileServerHandler {
	private static Logger logger = Logger.getLogger(TalksHandler.class.getName());
	
	private AuthenticationContext authenticationContext;
	private LevelDbEnv dbEnv;
	private LevelDbAbstractDao abstractDao;
	
	public TalksHandler(String path, AuthenticationContext authenticationContext, LevelDbEnv dbEnv) {
		super(path);
		this.authenticationContext = authenticationContext;
		this.dbEnv = dbEnv;
		this.abstractDao = new LevelDbAbstractDao();
	}
	
	@Override
	public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) throws Exception {
	
		String uri = getUri(e);
		
		String id = UriUtil.getIdFromUri(uri, "abstracts");

        if (id != null) {
            id = id.replaceAll("\\%20", " ");
        }
        
        logger.info("ID: " + id);
		
		String cookieUuidToken = getCookieValue(e, "uuidToken");
		AuthenticationResult cachedUserResult = null;
		if (cookieUuidToken != null) {
			cachedUserResult = authenticationContext.verifyUUidToken(cookieUuidToken);
		}
		String responseContent = "";
		
		if (isGet(e)) {
			List<PerstAbstract> talks = abstractDao.getAbstracts(dbEnv.getDb());
			logger.info("Submitted abstracts: ");
			StringBuffer sb = new StringBuffer();
			JsonArray abstarctsArray = new JsonArray();
			
			for (PerstAbstract talk : talks) {
				logger.info(talk.getAbstractTitle());
				JsonObject talkJson = generateTalkJson(cookieUuidToken, talk);
				abstarctsArray.add(talkJson);
			}
			
			JsonObject topObject = new JsonObject();
			topObject.add("abstracts", abstarctsArray);
			
			responseContent = topObject.toString();
		} else if (isPost(e) || isPut(e)) {
			String messageContent = getHttpMessageContent(e);
			logger.info("messageContent: " + messageContent);
			if (cachedUserResult != null && cachedUserResult.isUuidValidated() && cachedUserResult.getUuidToken() != null) {
				SubmittedTalk submittedTalk = new Gson().fromJson(messageContent, SubmittedTalk.class);
				MozillaPersonaCredentials cred = authenticationContext.getAuthenticatedUser(cachedUserResult.getUuidToken());
				if (submittedTalk != null && cred != null) {
					PerstAbstract talk = abstractDao.getAbstract(dbEnv.getDb(), submittedTalk.getId());
					if (talk != null && talk.getUserId().equals(cred.getEmail())) {
						PerstAbstract updatedAbstract = new PerstAbstract();
						updatedAbstract.setAbstractId(submittedTalk.getId());
						updatedAbstract.setAbstractTitle(submittedTalk.getTalkTitle());
						updatedAbstract.setAbstractContent(submittedTalk.getTalkText());
						updatedAbstract.setAbstractType(submittedTalk.getTalkType());
						updatedAbstract.setAbstractTopics(submittedTalk.getTalkTopics());
						updatedAbstract.setUserId(cred.getEmail());
						abstractDao.persistAbstract(dbEnv.getDb(), updatedAbstract);
						
						responseContent = generateTalkJson(cookieUuidToken, updatedAbstract).toString();
					} else if (talk == null) {
						PerstAbstract newAbstract = new PerstAbstract();
						newAbstract.setAbstractId(submittedTalk.getId());
						newAbstract.setAbstractTitle(submittedTalk.getTalkTitle());
						newAbstract.setAbstractContent(submittedTalk.getTalkText());
						newAbstract.setAbstractType(submittedTalk.getTalkType());
						newAbstract.setAbstractTopics(submittedTalk.getTalkTopics());
						newAbstract.setUserId(cred.getEmail());
						abstractDao.persistAbstract(dbEnv.getDb(), newAbstract);
						
						responseContent = generateTalkJson(cookieUuidToken, newAbstract).toString();
					}
				} 
			} 
		} else if (isDelete(e) && id != null) {
			logger.info("deleting talk with id: " + id);
			String authLevel = authenticationContext.getUserAuthLevel(cookieUuidToken);
			if (authLevel.equals("root") || authLevel.equals("admin")) {
				abstractDao.deleteAbstract(dbEnv.getDb(), id);
				responseContent = "{\"deleted\": true}";
			}
		}
		
		logger.info("responseContent: " + responseContent);
		logger.info("coookieUuidToken " + cookieUuidToken);
		writeContentsToBuffer(ctx, responseContent, "text/json");
	}

	private JsonObject generateTalkJson(String cookieUuidToken,
			PerstAbstract talk) {
		JsonObject talkJson = new JsonObject();
		talkJson.addProperty("id", talk.getAbstractId());
		talkJson.addProperty("talkTitle", talk.getAbstractTitle());
		talkJson.addProperty("talkText", talk.getAbstractContent());
		talkJson.addProperty("talkTopics", talk.getAbstractTopics());
		talkJson.addProperty("talkType", talk.getAbstractType());
		
		if (cookieUuidToken != null) {
			PerstUser user = authenticationContext.getUser(authenticationContext.getAuthenticatedUser(cookieUuidToken).getEmail());
			
			if (user != null && user.getUserId().equals(talk.getUserId())) {
				talkJson.addProperty("talkByLoggedInUser", true);
			} else {
				talkJson.addProperty("talkByLoggedInUser", false);
			}
		}
		
		PerstUser author = authenticationContext.getUser(talk.getUserId());
		talkJson.addProperty("talkSuggestedBy", author.getFirstName() + " " + author.getLastName());
		return talkJson;
	}
}
