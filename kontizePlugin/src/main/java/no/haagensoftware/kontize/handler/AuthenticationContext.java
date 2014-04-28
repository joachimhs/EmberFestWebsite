package no.haagensoftware.kontize.handler;

import no.haagensoftware.contentice.spi.StoragePlugin;
import no.haagensoftware.kontize.db.dao.UserDao;
import no.haagensoftware.kontize.models.AuthenticationResult;
import no.haagensoftware.kontize.models.Cookie;
import no.haagensoftware.kontize.models.MozillaPersonaCredentials;
import no.haagensoftware.kontize.models.User;
import org.apache.log4j.Logger;

import java.util.UUID;

/**
 * Created by jhsmbp on 1/24/14.
 */
public class AuthenticationContext {
    private static AuthenticationContext instance = null;

    private Logger logger = Logger.getLogger(AuthenticationContext.class.getName());

    private String rootUser = "";

    private StoragePlugin storagePlugin = null;
    private UserDao userDao = null;

    private AuthenticationContext(StoragePlugin storagePlugin) {
        rootUser = System.getProperty("com.embercampeurope.rootuser", "");
        this.storagePlugin = storagePlugin;
        userDao = new UserDao(this.storagePlugin);

    }

    public static AuthenticationContext getInstance(StoragePlugin storagePlugin) {
        if (instance == null) {
            instance = new AuthenticationContext(storagePlugin);
        }

        return instance;
    }

    public AuthenticationResult verifyUUidToken(String host, String uuidToken) {
//		userDao.listDB(dbEnv.getDb());

        AuthenticationResult authResult = new AuthenticationResult();
        Cookie cookie = userDao.getCookie(host, uuidToken);
        if (cookie != null) {
            authResult.setUuidToken(uuidToken);
            authResult.setUserId(cookie.getUserId());
            authResult.setUuidValidated(true);
        } else {
            authResult.setUuidToken(null);
            authResult.setUuidValidated(false);
            authResult.setStatusMessage("User not already logged in");
        }

        return authResult;
    }

    public Cookie getAuthenticatedUser(String host, String uuidToken) {
        return userDao.getCookie(host, uuidToken);
    }

    public AuthenticationResult verifyAndGetUser(String host, MozillaPersonaCredentials credentials) {
        AuthenticationResult authResult = new AuthenticationResult();
        if (credentials != null) {
            logger.info("Persona Status: " + credentials.getStatus() + " :: " + credentials.getReason());
        }

        if (credentials != null && credentials.getStatus().equalsIgnoreCase("okay")) {
            User user = getUser(host, credentials.getEmail());

            if (user != null) {
                Cookie cookie = new Cookie();
                cookie.setUserId(user.getUserId());
                cookie.setId(UUID.randomUUID().toString());
                cookie.setCreated(System.currentTimeMillis());
                cookie.setLastUsed(System.currentTimeMillis());
                userDao.persistCookie(host, cookie);

                authResult.setUuidToken(cookie.getId());
                authResult.setUuidValidated(true);
            } else {
                authResult.setUuidValidated(false);
                authResult.setStatusMessage("User not registered");

                String uniqueUserId = UUID.randomUUID().toString();
                User newUser = new User();
                newUser.setUserId(credentials.getEmail());
                newUser.setId(credentials.getEmail());
                newUser.setAuthenticationToken(uniqueUserId);
                newUser.setUserLevel("not_registered");
                registerNewUser(host, newUser);

                Cookie cookie = new Cookie();
                cookie.setUserId(newUser.getUserId());
                cookie.setId(UUID.randomUUID().toString());
                cookie.setCreated(System.currentTimeMillis());
                cookie.setLastUsed(System.currentTimeMillis());

                authResult.setUuidToken(cookie.getId());
                userDao.persistCookie(host, cookie);
            }
        } else {
            authResult.setUuidValidated(false);
            authResult.setUuidToken(null);
            authResult.setStatusMessage("User not authenticated");
        }

        return authResult;
    }

    public boolean logUserOut(String host, String uuidToken) {
        boolean loggedOut = false;

        userDao.deleteCookie(host, uuidToken);

        loggedOut = true;

        return loggedOut;
    }

    public boolean userIsNew(String host, String email) {
        return getUser(host, email) == null;
    }

    public boolean registerNewUser(String host, User user) {
        userDao.persistUser(host, user);

        return true;
    }

    public void persistUser(String host, User user) {
        userDao.persistUser(host, user);
    }

    public String getUserAuthLevel(String host, String cookieId, String userId) {
        String authLevel = "user";

        logger.info("root user. " + rootUser);
        if (cookieId != null) {

            //If user has system-level privileges, apply them
            if (userId != null && userId.equals(rootUser)) {
                authLevel = "root";
                logger.info("Setting authLevel to ROOT for : " + userId);
            } else if (userId != null) {
                //If user have user-level privileges, apply them
                User user = userDao.getUser(host, userId);

                if (user != null && user.getUserLevel() != null) {
                    authLevel = user.getUserLevel();
                }
            }
        }

        return authLevel;
    }

    public boolean isAdmin(String host, String cookieId, String userId) {
        String authLevel = getUserAuthLevel(host, cookieId, userId);
        return authLevel.equals("admin") || authLevel.equals("root");
    }

    public boolean isUser(String host, String cookieId, String userId) {
        String authLevel = getUserAuthLevel(host, cookieId, userId);
        return authLevel.equals("admin") || authLevel.equals("root") || authLevel.equals("user");
    }

    public User getUser(String host, String email) {
        return userDao.getUser(host, email);
    }
}
