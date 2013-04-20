package no.haagensoftware.leveldb.dao;

import static org.iq80.leveldb.impl.Iq80DBFactory.*;

import org.apache.log4j.Logger;
import org.iq80.leveldb.DB;

import com.google.gson.Gson;

import no.haagensoftware.perst.datatypes.PerstUser;

public class LevelDbUserDao {
	private Logger logger = Logger.getLogger(LevelDbUserDao.class.getName());
	
	public void persistUser(DB db, PerstUser user) {
		String userJson = new Gson().toJson(user);
		System.out.println("Persisting user: " + userJson);
		db.put(bytes("user_" + user.getUserId()), bytes(userJson));
	}
	
	public PerstUser getUser(DB db, String userId) {
		logger.info("Getting user: " + userId);
		PerstUser user = null;
		
		String userJson = asString(db.get(bytes("user_" + userId)));
		System.out.println(userJson);
		
		if (userJson != null) {
			logger.info(userJson);
			user = new Gson().fromJson(userJson, PerstUser.class);
		}
		
		return user;
	}
}
