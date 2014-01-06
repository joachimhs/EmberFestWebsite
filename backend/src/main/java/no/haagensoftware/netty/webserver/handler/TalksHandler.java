package no.haagensoftware.netty.webserver.handler;

import java.util.List;

import no.haagensoftware.datatypes.Cookie;
import no.haagensoftware.datatypes.Talk;
import no.haagensoftware.datatypes.User;
import no.haagensoftware.db.AbstractDao;
import no.haagensoftware.netty.webserver.AuthenticationContext;
import no.haagensoftware.netty.webserver.AuthenticationResult;
import no.haagensoftware.netty.webserver.SubmittedTalk;
import no.haagensoftware.datatypes.TalkObject;
import no.haagensoftware.db.DbEnv;
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
	private DbEnv dbEnv;
	private AbstractDao abstractDao;
	
	public TalksHandler(String path, AuthenticationContext authenticationContext, DbEnv dbEnv) {
		super(path);
		this.authenticationContext = authenticationContext;
		this.dbEnv = dbEnv;
		this.abstractDao = dbEnv.getAbstractDao();
	}
	
	@Override
	public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) throws Exception {
	
		String uri = getUri(e);
		
		String id = UriUtil.getIdFromUri(uri, "talks");

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
			
			
			List<Talk> talks = abstractDao.getAbstracts();
			logger.info("Submitted abstracts: ");
			StringBuffer sb = new StringBuffer();
			JsonArray abstarctsArray = new JsonArray();
			
			for (Talk talk : talks) {
                if (talk.getAbstractId() != null) {
				    logger.info(talk.getTitle());
				    JsonObject talkJson = generateTalkJson(cookieUuidToken, talk);
				    abstarctsArray.add(talkJson);
                }
			}
			
			JsonObject topObject = new JsonObject();
			topObject.add("talks", abstarctsArray);
			
			responseContent = topObject.toString();
		} else if (isPost(e) || isPut(e)) {
			String messageContent = getHttpMessageContent(e);
			logger.info("messageContent: " + messageContent);
			if (cachedUserResult != null && cachedUserResult.isUuidValidated() && cachedUserResult.getUuidToken() != null) {
				TalkObject talkObject = new Gson().fromJson(messageContent, TalkObject.class);
				SubmittedTalk submittedTalk = talkObject.getTalk();
				Cookie cookie = authenticationContext.getAuthenticatedUser(cachedUserResult.getUuidToken());
				if (submittedTalk != null && cookie != null) {
					Talk talk = abstractDao.getAbstract(submittedTalk.getId());
					if (talk != null && talk.getUserId().equals(cookie.getUserId())) {
						Talk updatedAbstract = new Talk();
						updatedAbstract.setAbstractId(submittedTalk.getId());
						updatedAbstract.setTitle(submittedTalk.getTitle());
						updatedAbstract.setComments(submittedTalk.getComments());
						updatedAbstract.setOutline(submittedTalk.getOutline());
						updatedAbstract.setParticipantRequirements(submittedTalk.getParticipantRequirements());
						updatedAbstract.setTalkAbstract(submittedTalk.getTalkAbstract());
						updatedAbstract.setTalkType(submittedTalk.getTalkType());
						updatedAbstract.setTopics(submittedTalk.getTopics());
						updatedAbstract.setUserId(cookie.getUserId());
						abstractDao.persistAbstract(updatedAbstract);

                        JsonObject toplevelObject = new JsonObject();
                        toplevelObject.add("talk", generateTalkJson(cookieUuidToken, updatedAbstract));
						responseContent = toplevelObject.toString();
					} else if (talk == null) {
						Talk newAbstract = new Talk();
                        newAbstract.setAbstractId(submittedTalk.getId());
                        newAbstract.setTitle(submittedTalk.getTitle());
                        newAbstract.setComments(submittedTalk.getComments());
                        newAbstract.setOutline(submittedTalk.getOutline());
                        newAbstract.setParticipantRequirements(submittedTalk.getParticipantRequirements());
                        newAbstract.setTalkAbstract(submittedTalk.getTalkAbstract());
                        newAbstract.setTalkType(submittedTalk.getTalkType());
                        newAbstract.setTopics(submittedTalk.getTopics());
                        newAbstract.setUserId(cookie.getUserId());
						abstractDao.persistAbstract(newAbstract);

                        JsonObject toplevelObject = new JsonObject();
                        toplevelObject.add("talk", generateTalkJson(cookieUuidToken, newAbstract));
						responseContent = toplevelObject.toString();
					}
				} 
			} 
		} else if (isDelete(e) && id != null) {
			logger.info("deleting talk with id: " + id);

            if (cachedUserResult != null) {

			    String authLevel = authenticationContext.getUserAuthLevel(cachedUserResult.getUuidToken(), cachedUserResult.getUserId());
                if (authLevel.equals("root") || authLevel.equals("admin")) {
                    abstractDao.deleteAbstract(id);
                    responseContent = "{\"deleted\": true}";
                }
            }
		}
		
		logger.info("responseContent: " + responseContent);
		logger.info("coookieUuidToken " + cookieUuidToken);
		writeContentsToBuffer(ctx, responseContent, "text/json");
	}

	private JsonObject generateTalkJson(String cookieUuidToken,
			Talk talk) {


		JsonObject talkJson = new JsonObject();
		talkJson.addProperty("id", talk.getAbstractId());
		talkJson.addProperty("title", talk.getTitle());
		talkJson.addProperty("talkAbstract", talk.getTalkAbstract());
		talkJson.addProperty("topics", talk.getTopics());
		talkJson.addProperty("talkType", talk.getTalkType());
		talkJson.addProperty("outline", talk.getOutline());
		talkJson.addProperty("participantRequirements", talk.getParticipantRequirements());
		talkJson.addProperty("comments", talk.getComments());

        if (cookieUuidToken != null) {
			User user = authenticationContext.getUser(authenticationContext.getAuthenticatedUser(cookieUuidToken).getUserId());
			
			if (user != null && user.getUserId().equals(talk.getUserId())) {
				talkJson.addProperty("talkByLoggedInUser", true);
			} else {
				talkJson.addProperty("talkByLoggedInUser", false);
			}
		}
		
		User author = authenticationContext.getUser(talk.getUserId());
		talkJson.addProperty("talkSuggestedBy", author.getFullName());
		return talkJson;
	}
}
