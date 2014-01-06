package no.haagensoftware.leveldb.dao;

import static org.iq80.leveldb.impl.Iq80DBFactory.*;

import no.haagensoftware.datatypes.Cookie;
import no.haagensoftware.datatypes.User;
import no.haagensoftware.db.UserDao;
import org.apache.log4j.Logger;
import org.iq80.leveldb.DB;

import com.google.gson.Gson;

import org.iq80.leveldb.DBIterator;

import java.util.Map;

public class LevelDbUserDao implements UserDao {
	private Logger logger = Logger.getLogger(LevelDbUserDao.class.getName());
	private DB db;

    public LevelDbUserDao(DB db) {
        this.db = db;
    }

    @Override
    public void persistUser(User user) {
		String userJson = new Gson().toJson(user);
		System.out.println("Persisting user: " + userJson);
		db.put(bytes("user_" + user.getUserId()), bytes(userJson));
	}
	
	@Override
    public User getUser(String userId) {
        listDb();
		logger.info("Getting user: " + userId);
		User user = null;
		
		String userJson = asString(db.get(bytes("user_" + userId)));
		System.out.println(userJson);
		
		if (userJson != null) {
			logger.info(userJson);
			user = new Gson().fromJson(userJson, User.class);
		}
		
		return user;
	}

    public void persistCookie(Cookie cookie) {
        String cookieJson = new Gson().toJson(cookie);
        db.put(bytes("cookie_" + cookie.getId()), bytes(cookieJson));
    }

    public Cookie getCookie(String id) {
        String cookieJson = asString(db.get(bytes("cookie_" + id)));
        Cookie cookie = null;
        if (cookieJson != null) {
            cookie = new Gson().fromJson(cookieJson, Cookie.class);
        }

        return cookie;
    }

    public void deleteCookie(String id) {
        db.delete(bytes("cookie_" + id));
    }

    public void listDb() {
        logger.info("--------<<<Dumping Database>>>>---------");
        DBIterator iterator = db.iterator();
        try {
            for (iterator.seekToFirst(); iterator.hasNext(); ) {
                Map.Entry<byte[], byte[]> entry = iterator.next();
                logger.info(asString(entry.getKey()) + " ::: " + asString(entry.getValue()));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
