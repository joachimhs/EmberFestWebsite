package no.haagensoftware.kontize.handler;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
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
public class UserHandler extends ContenticeHandler {
    private static final Logger logger = Logger.getLogger(UserHandler.class.getName());

    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, FullHttpRequest fullHttpRequest) throws Exception {
        String uri = getUri(fullHttpRequest);
        String cookieUuidToken = getCookieValue(fullHttpRequest, "uuidToken");

        logger.info("uuidToken: " + cookieUuidToken);

        AuthenticationContext authenticationContext = AuthenticationContext.getInstance();

        AuthenticationResult cachedUserResult = null;
        if (cookieUuidToken != null) {
            cachedUserResult = authenticationContext.verifyUUidToken(cookieUuidToken);
            logger.info("cachedUserResult: " + cachedUserResult);
        }
        String responseContent = "";

        if (isGet(fullHttpRequest) && cachedUserResult != null && cachedUserResult.getUuidToken() != null && cachedUserResult.isUuidValidated()) {
            logger.info("cached uuidToken: " + cachedUserResult.getUuidToken());
            User user = authenticationContext.getUser(authenticationContext.getAuthenticatedUser(cachedUserResult.getUuidToken()).getUserId());
            JsonObject topObject = new JsonObject();
            //JsonArray usersArray = new JsonArray();

            if (user != null) {
                List<Talk> userTalks = LevelDbEnv.getInstance().getAbstractDao().getAbstractsForUser(cachedUserResult.getUserId());
                JsonObject userJson = createUserJson(cachedUserResult, user, userTalks);

                //usersArray.add(userJson);
                topObject.add("user", userJson);
            }
            responseContent = topObject.toString();
        } else if ((isPost(fullHttpRequest) || isPut(fullHttpRequest)) && cachedUserResult != null && cachedUserResult.getUuidToken() != null && cachedUserResult.isUuidValidated()) {
            logger.info("POSTING/PUTTING USER");
            String messageContent = getHttpMessageContent(fullHttpRequest);
            logger.info("Message Content: " + messageContent);
            UserObject userObject = new Gson().fromJson(messageContent, UserObject.class);
            User newUser = userObject.getUser();
            if (newUser != null) {
                Cookie cookie= authenticationContext.getAuthenticatedUser(cachedUserResult.getUuidToken());
                if (cookie != null) {
                    User storedUser = authenticationContext.getUser(cookie.getUserId());
                    if (storedUser != null && storedUser.getUserId().equals(cookie.getUserId())) {
                        storedUser.setFullName((newUser.getFullName()));
                        storedUser.setAttendingDinner(newUser.getAttendingDinner());
                        storedUser.setUserLevel("user");
                        storedUser.setCompany(newUser.getCompany());
                        storedUser.setCountryOfResidence(newUser.getCountryOfResidence());
                        storedUser.setDietaryRequirements(newUser.getDietaryRequirements());
                        storedUser.setBio(newUser.getBio());
                        storedUser.setTwitter(newUser.getTwitter());
                        storedUser.setGithub(newUser.getGithub());
                        storedUser.setLinkedin(newUser.getLinkedin());
                        storedUser.setPhone(newUser.getPhone());
                        storedUser.setYearOfBirth(newUser.getYearOfBirth());
                        authenticationContext.persistUser(storedUser);
                    }

                    User user = authenticationContext.getUser(cookie.getUserId());

                    List<Talk> userTalks = LevelDbEnv.getInstance().getAbstractDao().getAbstractsForUser(cookie.getUserId());

                    JsonObject userJson = createUserJson(cachedUserResult, user, userTalks);
                    responseContent = userJson.toString();
                }

                logger.info("Registering new user: " + newUser.getUserId() + " " + newUser.getFullName() + " " + newUser.getCountryOfResidence());
            }
        }

        logger.info("responseContent: " + responseContent);
        logger.info("coookieUuidToken " + cookieUuidToken);

        writeContentsToBuffer(channelHandlerContext, responseContent, "application/json; charset=UTF-8");
    }

    private JsonObject createUserJson(AuthenticationResult cachedUserResult, User user, List<Talk> userTalks) {
        JsonObject userJson = new JsonObject();
        userJson.add("id",  new JsonPrimitive(cachedUserResult.getUuidToken()));
        userJson.add("userId", new JsonPrimitive(user.getUserId()));
        if (user.getUserLevel() != null && user.getUserLevel().equals("not_registered")) {
            userJson.add("authLevel", new JsonPrimitive(user.getUserLevel()));
        } else if (user.getUserLevel() != null && (user.getUserLevel().equals("user") || user.getUserLevel().equals("admin") || user.getUserLevel().equals("root"))) {
            userJson.addProperty("fullName", user.getFullName());
            userJson.addProperty("company", user.getCompany());
            userJson.addProperty("phone", user.getPhone());
            userJson.addProperty("dietaryRequirements", user.getDietaryRequirements());
            userJson.addProperty("countryOfResidence", user.getCountryOfResidence());
            userJson.addProperty("yearOfBirth", user.getYearOfBirth());
            userJson.addProperty("bio", user.getBio());
            userJson.addProperty("twitter", user.getTwitter());
            userJson.addProperty("github", user.getGithub());
            userJson.addProperty("linkedin", user.getLinkedin());
            userJson.addProperty("attendingDinner", user.getAttendingDinner() != null ? user.getAttendingDinner().booleanValue() : false);
            userJson.addProperty("authLevel", user.getUserLevel());
        }
        JsonArray talkArray = new JsonArray();

        for (Talk talk : userTalks) {
            if (talk.getAbstractId() != null) {
                talkArray.add(new JsonPrimitive(talk.getAbstractId()));
            }
        }

        userJson.add("talks", talkArray);
        return userJson;
    }
}
