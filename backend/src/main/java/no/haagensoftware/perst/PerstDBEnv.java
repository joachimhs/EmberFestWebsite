package no.haagensoftware.perst;

import java.io.File;

import org.garret.perst.Storage;
import org.garret.perst.StorageFactory;

public class PerstDBEnv {
	private String dbPath;
	private Storage storage;
	
	public PerstDBEnv(String dbPath) {
		this.dbPath = dbPath;
	}
	
	public void initializeDbAtPath() {
		storage = StorageFactory.getInstance().createStorage();
		storage.setProperty("perst.multiclient.support", Boolean.FALSE);
		storage.open(dbPath + File.separatorChar + "emberfest.db");
		
		storage.beginThreadTransaction(Storage.READ_WRITE_TRANSACTION);
		PerstStorageRoot storageRoot = (PerstStorageRoot)storage.getRoot();
		if (storageRoot == null) {
			storageRoot = new PerstStorageRoot(storage);
			storage.setRoot(storageRoot);
		}
		
		storage.endThreadTransaction();
	}
	
	public Storage getStorage() {
		return this.storage;
	}
	
	public void close() {
		if (storage.isOpened()) {
			storage.close();
		}
	}
}
