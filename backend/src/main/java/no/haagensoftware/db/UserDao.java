package no.haagensoftware.db;

import no.haagensoftware.datatypes.Cookie;
import no.haagensoftware.datatypes.User;

/**
 * Created by jhsmbp on 1/4/14.
 */
public interface UserDao {
    public void persistUser(User user);

    public User getUser(String userId);

    public void persistCookie(Cookie cookie);

    public Cookie getCookie(String id);

    public void deleteCookie(String id);
}
