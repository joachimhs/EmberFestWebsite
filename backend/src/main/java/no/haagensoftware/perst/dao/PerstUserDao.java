package no.haagensoftware.perst.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.garret.perst.Storage;

import no.haagensoftware.perst.PerstDBEnv;
import no.haagensoftware.perst.PerstStorageRoot;
import no.haagensoftware.perst.datatypes.PerstUser;

public class PerstUserDao {
	private static final Logger logger = Logger.getLogger(PerstUserDao.class.getName());
	
	public void persistUser(PerstDBEnv dbEnv, PerstUser user) {
		Storage storage = dbEnv.getStorage();
		storage.beginThreadTransaction(Storage.READ_WRITE_TRANSACTION);
		
		PerstStorageRoot storageRoot = (PerstStorageRoot) storage.getRoot();
		storageRoot.getUserIndex().put(user);
		
		user.modify();
		storage.store(user);
		storage.commit();
		
		storage.endThreadTransaction();	
	}
	
	public PerstUser getUser(PerstDBEnv dbEnv, String userId) {
		listUsers(dbEnv);
		Storage storage = dbEnv.getStorage();
		storage.beginThreadTransaction(Storage.READ_ONLY_TRANSACTION);
		PerstStorageRoot storageRoot = (PerstStorageRoot) storage.getRoot();
		
		PerstUser user = storageRoot.getUserIndex().get(userId);
		storage.endThreadTransaction();
		
		return user;
	}
	
	public List<PerstUser> listUsers(PerstDBEnv dbEnv) {
		List<PerstUser> userLIst = new ArrayList<>();
		
		Storage storage = dbEnv.getStorage();
		storage.beginThreadTransaction(Storage.READ_ONLY_TRANSACTION);
		PerstStorageRoot storageRoot = (PerstStorageRoot) storage.getRoot();
		
		logger.info("Persisted users:");
		for (PerstUser user : storageRoot.getUserIndex()) {
			userLIst.add(user);
			logger.info("user:" + user.getUserId());
		}
		
		storage.endThreadTransaction();
		
		return userLIst;
	}
}
