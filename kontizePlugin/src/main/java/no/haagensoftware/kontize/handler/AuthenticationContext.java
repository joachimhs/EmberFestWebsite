package no.haagensoftware.kontize.handler;

import no.haagensoftware.kontize.db.LevelDbEnv;
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

    private AuthenticationContext() {
        rootUser = System.getProperty("com.embercampeurope.rootuser", "");
    }

    public static AuthenticationContext getInstance() {
        if (instance == null) {
            instance = new AuthenticationContext();
        }

        return instance;
    }

    public AuthenticationResult verifyUUidToken(String uuidToken) {
//		userDao.listDB(dbEnv.getDb());

        AuthenticationResult authResult = new AuthenticationResult();
        Cookie cookie = LevelDbEnv.getInstance().getUserDao().getCookie(uuidToken);
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

    public Cookie getAuthenticatedUser(String uuidToken) {
        return LevelDbEnv.getInstance().getUserDao().getCookie(uuidToken);
    }

    public AuthenticationResult verifyAndGetUser(MozillaPersonaCredentials credentials) {
        AuthenticationResult authResult = new AuthenticationResult();
        if (credentials != null) {
            logger.info("Persona Status: " + credentials.getStatus() + " :: " + credentials.getReason());
        }

        if (credentials != null && credentials.getStatus().equalsIgnoreCase("okay")) {
            User user = getUser(credentials.getEmail());

            if (user != null) {
                Cookie cookie = new Cookie();
                cookie.setUserId(user.getUserId());
                cookie.setId(UUID.randomUUID().toString());
                cookie.setCreated(System.currentTimeMillis());
                cookie.setLastUsed(System.currentTimeMillis());
                LevelDbEnv.getInstance().getUserDao().persistCookie(cookie);

                authResult.setUuidToken(cookie.getId());
                authResult.setUuidValidated(true);
            } else {
                authResult.setUuidValidated(false);
                authResult.setStatusMessage("User not registered");

                String uniqueUserId = UUID.randomUUID().toString();
                User newUser = new User();
                newUser.setUserId(credentials.getEmail());
                newUser.setId(uniqueUserId);
                registerNewUser(newUser, "not_registered");

                Cookie cookie = new Cookie();
                cookie.setUserId(newUser.getUserId());
                cookie.setId(UUID.randomUUID().toString());
                cookie.setCreated(System.currentTimeMillis());
                cookie.setLastUsed(System.currentTimeMillis());
                LevelDbEnv.getInstance().getUserDao().persistCookie(cookie);
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

        LevelDbEnv.getInstance().getUserDao().deleteCookie(uuidToken);

        loggedOut = true;

        return loggedOut;
    }

    public boolean userIsNew(String email) {
        return getUser(email) == null;
    }

    public boolean registerNewUser(User user, String userLevel) {
        User newUser = new User();
        newUser.setId(user.getId());
        newUser.setUserId(user.getUserId());
        newUser.setFullName((user.getFullName()));
        newUser.setAttendingDinner(user.getAttendingDinner());
        newUser.setUserLevel(userLevel);
        newUser.setCompany(user.getCompany());
        newUser.setCountryOfResidence(user.getCountryOfResidence());
        newUser.setDietaryRequirements(user.getDietaryRequirements());
        newUser.setPhone(user.getPhone());
        newUser.setYearOfBirth(user.getYearOfBirth());

        LevelDbEnv.getInstance().getUserDao().persistUser(newUser);

        return true;
    }

    public void persistUser(User user) {
        LevelDbEnv.getInstance().getUserDao().persistUser(user);
    }

    public String getUserAuthLevel(String cookieId, String userId) {
        String authLevel = "user";

        logger.info("root user. " + rootUser);
        if (cookieId != null) {

            //If user has system-level privileges, apply them
            if (userId != null && userId.equals(rootUser)) {
                authLevel = "root";
                logger.info("Setting authLevel to ROOT for : " + userId);
            } else if (userId != null) {
                //If user have user-level privileges, apply them
                User user = LevelDbEnv.getInstance().getUserDao().getUser(userId);

                if (user != null && user.getUserLevel() != null) {
                    authLevel = user.getUserLevel();
                }
            }
        }

        return authLevel;
    }

    public User getUser(String email) {
        return LevelDbEnv.getInstance().getUserDao().getUser(email);
    }
}
