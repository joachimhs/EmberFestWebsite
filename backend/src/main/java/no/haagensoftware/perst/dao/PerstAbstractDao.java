package no.haagensoftware.perst.dao;

import java.util.ArrayList;
import java.util.List;

import no.haagensoftware.perst.PerstDBEnv;
import no.haagensoftware.perst.PerstStorageRoot;
import no.haagensoftware.perst.datatypes.PerstAbstract;
import no.haagensoftware.perst.datatypes.PerstUser;

import org.apache.log4j.Logger;
import org.garret.perst.Storage;

public class PerstAbstractDao {
	private static final Logger logger = Logger.getLogger(PerstAbstractDao.class.getName());
	
	public void persistAbstract(PerstDBEnv dbEnv, PerstAbstract newAbstract) {
		Storage storage = dbEnv.getStorage();
		storage.beginThreadTransaction(Storage.READ_WRITE_TRANSACTION);
		
		PerstStorageRoot storageRoot = (PerstStorageRoot) storage.getRoot();
		storageRoot.getAbstractIndex().put(newAbstract);
		
		newAbstract.modify();
		storage.store(newAbstract);
		storage.commit();
		
		storage.endThreadTransaction();	
	}
	
	public PerstAbstract getAbstract(PerstDBEnv dbEnv, String abstractId) {
		Storage storage = dbEnv.getStorage();
		storage.beginThreadTransaction(Storage.READ_ONLY_TRANSACTION);
		PerstStorageRoot storageRoot = (PerstStorageRoot) storage.getRoot();
		
		PerstAbstract storedAbstract = storageRoot.getAbstractIndex().get(abstractId);
		storage.endThreadTransaction();
		
		return storedAbstract;
	}
	
	public List<PerstAbstract> getAbstracts(PerstDBEnv dbEnv) {
		List<PerstAbstract> storedAbstracts = new ArrayList<>();
		
		Storage storage = dbEnv.getStorage();
		storage.beginThreadTransaction(Storage.READ_ONLY_TRANSACTION);
		PerstStorageRoot storageRoot = (PerstStorageRoot) storage.getRoot();
		
		for (PerstAbstract storedAbstract : storageRoot.getAbstractIndex()) {
			storedAbstracts.add(storedAbstract);
		}
		
		storage.endThreadTransaction();
		
		return storedAbstracts;
	}
}
