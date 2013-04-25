package no.haagensoftware.leveldb;

import org.iq80.leveldb.*;

import static org.iq80.leveldb.impl.Iq80DBFactory.*;

import java.io.*;

public class LevelDbEnv {	
	private String dbPath;
	private DB db;
	
	public LevelDbEnv(String dbPath) {
		this.dbPath = dbPath;
	}
	
	public void initializeDbAtPath() throws IOException {
		Options options = new Options();
		options.createIfMissing(true);
		db = factory.open(new File(dbPath), options);
	}
	
	public DB getDb() {
		return db;
	}
	
	public void close() {
		try {
			db.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) throws Exception {
		LevelDbEnv dbEnv = new LevelDbEnv("/srv/embercampeuropedbtest");
		dbEnv.initializeDbAtPath();
	}
}
