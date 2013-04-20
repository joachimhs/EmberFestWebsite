package no.haagensoftware.leveldb;

import no.haagensoftware.leveldb.dao.LevelDbAbstractDao;
import no.haagensoftware.leveldb.dao.LevelDbUserDao;
import no.haagensoftware.perst.PerstDBEnv;
import no.haagensoftware.perst.dao.PerstAbstractDao;
import no.haagensoftware.perst.dao.PerstUserDao;
import no.haagensoftware.perst.datatypes.PerstAbstract;
import no.haagensoftware.perst.datatypes.PerstUser;

import org.iq80.leveldb.*;

import com.google.gson.Gson;

import static org.iq80.leveldb.impl.Iq80DBFactory.*;

import java.io.*;
import java.util.List;

public class LevelDbEnv {
	private PerstDBEnv perstEnv;
	
	private String dbPath;
	private DB db;
	
	public LevelDbEnv(String dbPath) {
		this.dbPath = dbPath;
	}
	
	public void initializeDbAtPath() throws IOException {
		Options options = new Options();
		options.createIfMissing(true);
		db = factory.open(new File(dbPath), options);
		
		
		perstEnv = new PerstDBEnv(dbPath);
		perstEnv.initializeDbAtPath();		
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
		dbEnv.testDB();
	}
	
	public void testDB() {
		PerstUserDao userDao = new PerstUserDao();
		List<PerstUser> userList = userDao.listUsers(perstEnv);
		
		LevelDbUserDao lUserDao = new LevelDbUserDao();
		for (PerstUser user : userList) {
			lUserDao.persistUser(db, user);
		}
		
		PerstAbstractDao absDao = new PerstAbstractDao();
		LevelDbAbstractDao lAbsDao = new LevelDbAbstractDao();
		for (PerstAbstract talk : absDao.getAbstracts(perstEnv)) {
			lAbsDao.persistAbstract(db, talk);
		}
		
		DBIterator iterator = db.iterator();
		try {
			for(iterator.seekToFirst(); iterator.hasNext(); iterator.next()) {
				String json = asString(iterator.peekNext().getValue());
				System.out.println(json);
			}
		} finally {
			try {
				iterator.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
