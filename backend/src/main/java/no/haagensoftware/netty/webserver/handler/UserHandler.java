package no.haagensoftware.netty.webserver.handler;

import no.haagensoftware.auth.MozillaPersonaCredentials;
import no.haagensoftware.auth.NewUser;
import no.haagensoftware.leveldb.LevelDbEnv;
import no.haagensoftware.leveldb.dao.LevelDbAbstractDao;
import no.haagensoftware.netty.webserver.AuthenticationContext;
import no.haagensoftware.netty.webserver.AuthenticationResult;
import no.haagensoftware.perst.datatypes.PerstAbstract;
import no.haagensoftware.perst.datatypes.PerstUser;

import org.apache.log4j.Logger;
import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.MessageEvent;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

public class UserHandler extends FileServerHandler {
	private static Logger logger = Logger.getLogger(UserHandler.class.getName());
	
	private AuthenticationContext authenticationContext;
	private LevelDbEnv dbEnv;
	private LevelDbAbstractDao abstractDao;
	
	public UserHandler(String path, AuthenticationContext authenticationContext, LevelDbEnv dbEnv) {
		super(path);
		this.authenticationContext = authenticationContext;
		this.dbEnv = dbEnv;
		this.abstractDao = new LevelDbAbstractDao();
	}
	
	@Override
	public void messageReceived(ChannelHandlerContext ctx, MessageEvent e)
			throws Exception {
		String uri = getUri(e);
		String cookieUuidToken = getCookieValue(e, "uuidToken");
		AuthenticationResult cachedUserResult = null;
		if (cookieUuidToken != null) {
			cachedUserResult = authenticationContext.verifyUUidToken(cookieUuidToken);
			logger.info("cachedUserResutlt: " + cachedUserResult);
		}
		String responseContent = "";
		
		if (isGet(e) && cachedUserResult != null && cachedUserResult.getUuidToken() != null && cachedUserResult.isUuidValidated()) {
			logger.info("cached uuidToken: " + cachedUserResult.getUuidToken());
			PerstUser user = authenticationContext.getUser(authenticationContext.getAuthenticatedUser(cachedUserResult.getUuidToken()).getEmail());
			JsonObject topObject = new JsonObject();
			JsonArray userArray = new JsonArray();
			if (user != null) {
				JsonObject userJson = createUserJson(cachedUserResult, user);
				
				userArray.add(userJson);
				topObject.add("users", userArray);
				
				responseContent = topObject.toString();
			}
		} else if ((isPost(e) || isPut(e)) && cachedUserResult != null && cachedUserResult.getUuidToken() != null && cachedUserResult.isUuidValidated()) {
			logger.info("POSTING/PUTTING USER");
			String messageContent = getHttpMessageContent(e);
			logger.info(messageContent);
			NewUser newUser = new Gson().fromJson(messageContent, NewUser.class);
			if (newUser != null) {
				MozillaPersonaCredentials cred = authenticationContext.getAuthenticatedUser(newUser.getId());
				if (cred != null) {
					PerstUser storedUser = authenticationContext.getUser(cred.getEmail());
					if (storedUser != null && storedUser.getUserId().equals(cred.getEmail())) {
						storedUser.setFirstName(newUser.getFirstName());
						storedUser.setLastName(newUser.getLastName());
						storedUser.setHomeCountry(newUser.getHomeCountry());
						storedUser.setUserLevel("user");
						authenticationContext.persistUser(storedUser);
					} 
					
					PerstUser user = authenticationContext.getUser(cred.getEmail());
					JsonObject userJson = createUserJson(cachedUserResult, user);
					responseContent = userJson.toString();
				}
				
				logger.info("Registering new user: " + newUser.getEmail() + " " + newUser.getFirstName() + " " + newUser.getLastName() + " " + newUser.getHomeCountry());
			}
		}
		
		logger.info("responseContent: " + responseContent);
		logger.info("coookieUuidToken " + cookieUuidToken);
		writeContentsToBuffer(ctx, responseContent, "text/json");
	}

	private JsonObject createUserJson(AuthenticationResult cachedUserResult, PerstUser user) {
		JsonObject userJson = new JsonObject();
		userJson.add("id",  new JsonPrimitive(cachedUserResult.getUuidToken()));
		userJson.add("userId", new JsonPrimitive(user.getUserId()));
		if (user.getUserLevel() != null && user.getUserLevel().equals("not_registered")) {
			userJson.add("authLevel", new JsonPrimitive(user.getUserLevel()));
		} else if (user.getUserLevel() != null && (user.getUserLevel().equals("user") || user.getUserLevel().equals("admin") || user.getUserLevel().equals("root"))) {
			userJson.add("firstName", new JsonPrimitive(user.getFirstName()));
			userJson.add("lastName", new JsonPrimitive(user.getLastName()));
			userJson.add("homeCountry", new JsonPrimitive(user.getHomeCountry()));
			userJson.add("authLevel", new JsonPrimitive(user.getUserLevel()));
		}
		JsonArray talkArray = new JsonArray();
		
		for (PerstAbstract talk : abstractDao.getAbstracts(dbEnv.getDb())) {
			if (talk.getUserId().equals(user.getUserId())) {
				talkArray.add(new JsonPrimitive(talk.getAbstractId()));
			}
		}
		
		userJson.add("talks", talkArray);
		return userJson;
	}

}
