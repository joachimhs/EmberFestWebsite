package no.haagensoftware.kontize.db.dao;

import com.google.gson.Gson;
import com.google.gson.JsonPrimitive;
import no.haagensoftware.contentice.data.SubCategoryData;
import no.haagensoftware.contentice.spi.StoragePlugin;
import no.haagensoftware.kontize.models.AdminKey;
import no.haagensoftware.kontize.models.Cookie;
import no.haagensoftware.kontize.models.Talk;
import no.haagensoftware.kontize.models.User;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.List;

/**
 * Created by jhsmbp on 1/24/14.
 */
public class UserDao {
    private Logger logger = Logger.getLogger(UserDao.class.getName());
    private StoragePlugin storagePlugin = null;

    public UserDao(StoragePlugin storagePlugin) {
        this.storagePlugin = storagePlugin;
    }

    public void persistUser(String host, User user) {
        storagePlugin.setSubCategory(host, "users", user.getId(), convertUserToSubcategory(user));
    }

    public User getUser(String host, String userId) {
        logger.info("Getting user: " + userId);
        User user = null;

        SubCategoryData subCategoryData = storagePlugin.getSubCategory(host, "users", userId);
        if (subCategoryData != null) {
            user = convertSubcategoryToUser(subCategoryData);
        }


        return user;
    }

    public void persistCookie(String host, Cookie cookie) {
        storagePlugin.setSubCategory(host, "cookies", cookie.getId(), convertCookieToSubcategoryData(cookie));
    }

    public Cookie getCookie(String host, String id) {
        Cookie cookie = null;

        SubCategoryData subCategoryData = storagePlugin.getSubCategory(host, "cookies", id);
        if (subCategoryData != null) {
            cookie = convertSubcategoryToCookie(subCategoryData);
        }

        return cookie;
    }

    public void deleteCookie(String host, String id) {
        storagePlugin.deleteSubcategory(host, "cookies", id);
    }

    private Cookie convertSubcategoryToCookie(SubCategoryData subCategoryData) {
        Cookie cookie = new Cookie();

        cookie.setId(subCategoryData.getId());

        if (cookie.getId().startsWith("cookies_")) {
            cookie.setId(cookie.getId().substring(8));
        }
        cookie.setCreated(subCategoryData.getLongValueForKey("created"));
        cookie.setLastUsed(subCategoryData.getLongValueForKey("lastUsed"));
        cookie.setUserId(subCategoryData.getValueForKey("userId"));

        return cookie;
    }

    private SubCategoryData convertCookieToSubcategoryData(Cookie cookie) {
        SubCategoryData subCategoryData = new SubCategoryData();

        subCategoryData.setId(cookie.getId());

        if (cookie.getCreated() != null) {
            subCategoryData.getKeyMap().put("created", new JsonPrimitive(cookie.getCreated()));
        }

        if (cookie.getLastUsed() != null) {
            subCategoryData.getKeyMap().put("lastUsed", new JsonPrimitive(cookie.getLastUsed()));
        }

        if (cookie.getUserId() != null) {
            subCategoryData.getKeyMap().put("userId", new JsonPrimitive(cookie.getUserId()));
        }

        return subCategoryData;
    }

    private User convertSubcategoryToUser(SubCategoryData subCategoryData) {
        User user = new User();
        user.setId(subCategoryData.getId());

        if (user.getId().startsWith("users_")) {
            user.setId(user.getId().substring(6));
        }

        user.setLinkedin(subCategoryData.getValueForKey("linkedin"));
        user.setUserId(subCategoryData.getValueForKey("userId"));
        user.setGithub(subCategoryData.getValueForKey("github"));
        user.setTwitter(subCategoryData.getValueForKey("twitter"));
        user.setAttendingDinner(new Boolean(subCategoryData.getValueForKey("attendingDinner")));
        user.setBio(subCategoryData.getValueForKey("bio"));
        user.setCompany(subCategoryData.getValueForKey("company"));
        user.setCountryOfResidence(subCategoryData.getValueForKey("countryOfResidence"));
        user.setDietaryRequirements(subCategoryData.getValueForKey("dietaryRequirements"));
        user.setFullName(subCategoryData.getValueForKey("fullName"));
        user.setPhone(subCategoryData.getValueForKey("phone"));
        user.setUserLevel(subCategoryData.getValueForKey("userLevel"));
        user.setYearOfBirth(subCategoryData.getValueForKey("yearOfBirth"));
        user.setAuthenticationToken(subCategoryData.getValueForKey("authenticationToken"));
        user.setPhoto(subCategoryData.getValueForKey("photo"));

        return user;
    }

    private SubCategoryData convertUserToSubcategory(User user) {
        SubCategoryData subCategoryData = new SubCategoryData();

        subCategoryData.setId(user.getId());

        if (user.getLinkedin() != null) {
            subCategoryData.getKeyMap().put("linkedin", new JsonPrimitive(user.getLinkedin()));
        }

        if (user.getUserId() != null) {
            subCategoryData.getKeyMap().put("userId", new JsonPrimitive(user.getUserId()));
        }

        if (user.getGithub() != null) {
            subCategoryData.getKeyMap().put("github", new JsonPrimitive(user.getGithub()));
        }

        if (user.getTwitter() != null) {
            subCategoryData.getKeyMap().put("twitter", new JsonPrimitive(user.getTwitter()));
        }

        if (user.getCountryOfResidence() != null) {
            subCategoryData.getKeyMap().put("countryOfResidence", new JsonPrimitive(user.getCountryOfResidence()));
        }

        if (user.getAttendingDinner() != null) {
            subCategoryData.getKeyMap().put("attendingDinner", new JsonPrimitive(user.getAttendingDinner()));
        }

        if (user.getBio() != null) {
            subCategoryData.getKeyMap().put("bio", new JsonPrimitive(user.getBio()));
        }

        if (user.getCompany() != null) {
            subCategoryData.getKeyMap().put("company", new JsonPrimitive(user.getCompany()));
        }

        if (user.getFullName() != null) {
            subCategoryData.getKeyMap().put("fullName", new JsonPrimitive(user.getFullName()));
        }

        if (user.getDietaryRequirements() != null) {
            subCategoryData.getKeyMap().put("dietaryRequirements", new JsonPrimitive(user.getDietaryRequirements()));
        }

        if (user.getPhone() != null) {
            subCategoryData.getKeyMap().put("phone", new JsonPrimitive(user.getPhone()));
        }

        if (user.getUserLevel() != null) {
            subCategoryData.getKeyMap().put("userLevel", new JsonPrimitive(user.getUserLevel()));
        }

        if (user.getYearOfBirth() != null) {
            subCategoryData.getKeyMap().put("yearOfBirth", new JsonPrimitive(user.getYearOfBirth()));
        }

        if (user.getAuthenticationToken() != null) {
            subCategoryData.getKeyMap().put("authenticationToken", new JsonPrimitive(user.getAuthenticationToken()));
        }

        if (user.getPhoto() != null) {
            subCategoryData.getKeyMap().put("photo", new JsonPrimitive(user.getPhoto()));
        }

        return subCategoryData;
    }
}
