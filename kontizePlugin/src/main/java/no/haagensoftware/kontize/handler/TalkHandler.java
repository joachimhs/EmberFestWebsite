package no.haagensoftware.kontize.handler;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;
import no.haagensoftware.contentice.handler.ContenticeHandler;
import no.haagensoftware.kontize.db.LevelDbEnv;
import no.haagensoftware.kontize.models.*;
import org.apache.log4j.Logger;

import java.util.List;

/**
 * Created by jhsmbp on 1/24/14.
 */
public class TalkHandler extends ContenticeHandler {
    private static Logger logger = Logger.getLogger(TalkHandler.class.getName());
    private AuthenticationContext authenticationContext;

    public TalkHandler() {
        authenticationContext = AuthenticationContext.getInstance();
    }

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, FullHttpRequest fullHttpRequest) throws Exception {
        String id = getParameter("talk");
        boolean isUser = false;

        String cookieUuidToken = getCookieValue(fullHttpRequest, "uuidToken");
        AuthenticationResult cachedUserResult = null;
        if (cookieUuidToken != null) {
            cachedUserResult = authenticationContext.verifyUUidToken(cookieUuidToken);
            authenticationContext.isUser(cookieUuidToken, cachedUserResult.getUserId());
        }
        String responseContent = "";

        if (isGet(fullHttpRequest) && id == null) {
            List<Talk> talks = LevelDbEnv.getInstance().getAbstractDao().getAbstracts();
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
        } else if (isGet(fullHttpRequest) && id != null) {
            Talk talk = LevelDbEnv.getInstance().getAbstractDao().getAbstract(id);
            if (talk != null) {
                JsonObject talkJson = generateTalkJson(cookieUuidToken, talk);

                JsonObject topObject = new JsonObject();
                topObject.add("talk", talkJson);

                responseContent = topObject.toString();
            }
        } else if (isPost(fullHttpRequest) || isPut(fullHttpRequest)) {
            String messageContent = getHttpMessageContent(fullHttpRequest);
            logger.info("messageContent: " + messageContent);
            if (cachedUserResult != null && cachedUserResult.isUuidValidated() && cachedUserResult.getUuidToken() != null) {
                TalkObject talkObject = new Gson().fromJson(messageContent, TalkObject.class);
                SubmittedTalk submittedTalk = talkObject.getTalk();
                Cookie cookie = authenticationContext.getAuthenticatedUser(cachedUserResult.getUuidToken());
                if (submittedTalk != null && cookie != null) {
                    Talk talk = LevelDbEnv.getInstance().getAbstractDao().getAbstract(submittedTalk.getId());
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
                        updatedAbstract.setTalkIntendedAudience(submittedTalk.getTalkIntendedAudience());
                        updatedAbstract.setUserId(cookie.getUserId());
                        LevelDbEnv.getInstance().getAbstractDao().persistAbstract(updatedAbstract);

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
                        newAbstract.setTalkIntendedAudience(submittedTalk.getTalkIntendedAudience());
                        newAbstract.setUserId(cookie.getUserId());
                        LevelDbEnv.getInstance().getAbstractDao().persistAbstract(newAbstract);

                        JsonObject toplevelObject = new JsonObject();
                        toplevelObject.add("talk", generateTalkJson(cookieUuidToken, newAbstract));
                        responseContent = toplevelObject.toString();
                    }
                }
            }
        } else if (isDelete(fullHttpRequest) && id != null) {
            logger.info("deleting talk with id: " + id);

            if (cachedUserResult != null) {

                String authLevel = authenticationContext.getUserAuthLevel(cachedUserResult.getUuidToken(), cachedUserResult.getUserId());
                if (authLevel.equals("root") || authLevel.equals("admin")) {
                    LevelDbEnv.getInstance().getAbstractDao().deleteAbstract(id);
                    responseContent = "{\"deleted\": true}";
                }
            }
        }

        logger.info("responseContent: " + responseContent);
        logger.info("coookieUuidToken " + cookieUuidToken);

        writeContentsToBuffer(channelHandlerContext, responseContent, "application/json; charset=UTF-8");
    }

    private JsonObject generateTalkJson(String cookieUuidToken, Talk talk) {

        AuthenticationContext authenticationContext = AuthenticationContext.getInstance();

        JsonObject talkJson = new JsonObject();
        talkJson.addProperty("id", talk.getAbstractId());
        talkJson.addProperty("title", talk.getTitle());
        talkJson.addProperty("talkAbstract", talk.getTalkAbstract());
        talkJson.addProperty("topics", talk.getTopics());
        talkJson.addProperty("talkType", talk.getTalkType());
        talkJson.addProperty("outline", talk.getOutline());
        talkJson.addProperty("participantRequirements", talk.getParticipantRequirements());
        talkJson.addProperty("talkIntendedAudience", talk.getTalkIntendedAudience());
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
