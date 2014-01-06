package no.haagensoftware.netty.webserver.handler;

import no.haagensoftware.datatypes.Cookie;
import no.haagensoftware.datatypes.Talk;
import no.haagensoftware.datatypes.User;
import no.haagensoftware.datatypes.UserObject;
import no.haagensoftware.db.AbstractDao;
import no.haagensoftware.netty.webserver.AuthenticationContext;
import no.haagensoftware.netty.webserver.AuthenticationResult;

import no.haagensoftware.db.DbEnv;
import org.apache.log4j.Logger;
import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.MessageEvent;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

public class UserHandler extends FileServerHandler {
	private static Logger logger = Logger.getLogger(UserHandler.class.getName());
	
	private AuthenticationContext authenticationContext;
	private DbEnv dbEnv;
	private AbstractDao abstractDao;
	
	public UserHandler(String path, AuthenticationContext authenticationContext, DbEnv dbEnv) {
		super(path);
		this.authenticationContext = authenticationContext;
		this.dbEnv = dbEnv;
		this.abstractDao = dbEnv.getAbstractDao();
	}
	
	@Override
	public void messageReceived(ChannelHandlerContext ctx, MessageEvent e)
			throws Exception {
		String uri = getUri(e);
		String cookieUuidToken = getCookieValue(e, "uuidToken");

        logger.info("uuidToken: " + cookieUuidToken);

		AuthenticationResult cachedUserResult = null;
		if (cookieUuidToken != null) {
			cachedUserResult = authenticationContext.verifyUUidToken(cookieUuidToken);
			logger.info("cachedUserResult: " + cachedUserResult);
		}
		String responseContent = "";
		
		if (isGet(e) && cachedUserResult != null && cachedUserResult.getUuidToken() != null && cachedUserResult.isUuidValidated()) {
			logger.info("cached uuidToken: " + cachedUserResult.getUuidToken());
			User user = authenticationContext.getUser(authenticationContext.getAuthenticatedUser(cachedUserResult.getUuidToken()).getUserId());
			JsonObject topObject = new JsonObject();
            //JsonArray usersArray = new JsonArray();

			if (user != null) {
                List<Talk> userTalks = dbEnv.getAbstractDao().getAbstractsForUser(cachedUserResult.getUserId());
				JsonObject userJson = createUserJson(cachedUserResult, user, userTalks);

                //usersArray.add(userJson);
				topObject.add("user", userJson);
			}
            responseContent = topObject.toString();
		} else if ((isPost(e) || isPut(e)) && cachedUserResult != null && cachedUserResult.getUuidToken() != null && cachedUserResult.isUuidValidated()) {
			logger.info("POSTING/PUTTING USER");
			String messageContent = getHttpMessageContent(e);
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
                        storedUser.setPhone(newUser.getPhone());
                        storedUser.setYearOfBirth(newUser.getYearOfBirth());
						authenticationContext.persistUser(storedUser);
					} 
					
					User user = authenticationContext.getUser(cookie.getUserId());

                    List<Talk> userTalks = dbEnv.getAbstractDao().getAbstractsForUser(cookie.getUserId());

					JsonObject userJson = createUserJson(cachedUserResult, user, userTalks);
					responseContent = userJson.toString();
				}
				
				logger.info("Registering new user: " + newUser.getUserId() + " " + newUser.getFullName() + " " + newUser.getCountryOfResidence());
			}
		}
		
		logger.info("responseContent: " + responseContent);
		logger.info("coookieUuidToken " + cookieUuidToken);
		writeContentsToBuffer(ctx, responseContent, "text/json");
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
