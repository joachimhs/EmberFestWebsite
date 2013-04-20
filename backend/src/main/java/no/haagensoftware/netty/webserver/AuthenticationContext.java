package no.haagensoftware.netty.webserver;

import java.util.Hashtable;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.haagensoftware.netty.webserver.spi.PropertyConstants;

import no.haagensoftware.auth.MozillaPersonaCredentials;
import no.haagensoftware.auth.NewUser;
import no.haagensoftware.leveldb.LevelDbEnv;
import no.haagensoftware.leveldb.dao.LevelDbUserDao;
import no.haagensoftware.perst.PerstDBEnv;
import no.haagensoftware.perst.dao.PerstUserDao;
import no.haagensoftware.perst.datatypes.PerstUser;

public class AuthenticationContext {
	private Logger logger = Logger.getLogger(AuthenticationContext.class.getName());
	
	private LevelDbEnv dbEnv;
	private Hashtable<String, MozillaPersonaCredentials> authenticatedUsers;
	private LevelDbUserDao userDao;
	private String rootUser = "";
	
	public AuthenticationContext(LevelDbEnv dbEnv) {
		this.dbEnv = dbEnv;
		authenticatedUsers = new Hashtable<>();
		this.userDao = new LevelDbUserDao();
		rootUser = System.getProperty(PropertyConstants.ROOT_USER, "");
	}
	
	public AuthenticationResult verifyUUidToken(String uuidToken) {
		AuthenticationResult authResult = new AuthenticationResult();
		MozillaPersonaCredentials credentials = authenticatedUsers.get(uuidToken);
		if (credentials != null && credentials.getStatus().equalsIgnoreCase("okay")) {
			authResult.setUuidToken(uuidToken);
			authResult.setUuidValidated(true);
		} else {
			authResult.setUuidToken(null);
			authResult.setUuidValidated(false);
			authResult.setStatusMessage("User not already logged in");
		}
		
		return authResult;
	}
	
	public MozillaPersonaCredentials getAuthenticatedUser(String uuidToken) {
		return authenticatedUsers.get(uuidToken);
	}
	
	public AuthenticationResult verifyAndGetUser(MozillaPersonaCredentials credentials) {
		AuthenticationResult authResult = new AuthenticationResult();
		if (credentials != null) {
			logger.info("Persona Status: " + credentials.getStatus() + " :: " + credentials.getReason());
		}
		if (credentials != null && credentials.getStatus().equalsIgnoreCase("okay")) {
			PerstUser user = getUser(credentials.getEmail());
			String uuid = UUID.randomUUID().toString();
			if (user != null) {
	    		authenticatedUsers.put(uuid, credentials);
	    		authResult.setUuidToken(uuid);
	    		authResult.setUuidValidated(true);
			} else {
				authenticatedUsers.put(uuid, credentials);
				authResult.setUuidToken(uuid);
	    		authResult.setUuidValidated(false);
	    		authResult.setStatusMessage("User not registered");
	    		NewUser newUser = new NewUser();
	    		newUser.setEmail(credentials.getEmail());
	    		newUser.setId(uuid);
	    		registerNewUser(newUser, "not_registered");
			}
		} else {
			authResult.setUuidValidated(false);
			authResult.setUuidToken(null);
			authResult.setStatusMessage("User not authenticated");
		}
		
		return authResult;
	}
	
	public boolean logUserOut(String uuidToken) {
		boolean loggedOut = false;
		
		for (String uuid : authenticatedUsers.keySet()) {
			logger.info("UUID: " + uuid);
		}
		logger.info("logging out user: " + uuidToken + " :: " + authenticatedUsers.contains(uuidToken));
		authenticatedUsers.remove(uuidToken);
		loggedOut = true;
		
		return loggedOut;
	}
	
	public boolean userIsNew(String email) {
		return getUser(email) == null;
	}
	
	public boolean registerNewUser(NewUser user, String userLevel) {
		PerstUser newUser = new PerstUser();
		newUser.setUserId(user.getEmail());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setUserLevel(userLevel);
		newUser.setHomeCountry(user.getHomeCountry());
		
		this.userDao.persistUser(dbEnv.getDb(), newUser);
		
		return true;
	}
	
	public void persistUser(PerstUser user) {
		this.userDao.persistUser(dbEnv.getDb(), user);
	}
	
	public String getUserAuthLevel(String uuid) {
		String authLevel = "user";
		
		logger.info("root user. " + rootUser);
		if (uuid != null) {
			MozillaPersonaCredentials cred = authenticatedUsers.get(uuid);
			//If user has system-level privileges, apply them
			if (cred != null && cred.getEmail().equals(rootUser)) {
				authLevel = "root";
				logger.info("Setting authLevel to ROOT for : " + cred.getEmail());
			} else if (cred != null) {
				PerstUser user = getUser(cred.getEmail());
				
				logger.info("Setting authLevel to " + user.getUserLevel() + " for : " + cred.getEmail());
				
				//If user have user-level privileges, apply them
				if (user != null && user.getUserLevel() != null) {
					authLevel = user.getUserLevel();
				}
			}
		}
		
		return authLevel;
	}
	
	public PerstUser getUser(String email) {
		return this.userDao.getUser(dbEnv.getDb(), email);
	}
}
