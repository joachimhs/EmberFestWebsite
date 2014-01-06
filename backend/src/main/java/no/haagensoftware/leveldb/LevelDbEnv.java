package no.haagensoftware.leveldb;

import no.haagensoftware.db.AbstractDao;
import no.haagensoftware.db.DbEnv;
import no.haagensoftware.db.UserDao;
import no.haagensoftware.leveldb.dao.LevelDbAbstractDao;
import no.haagensoftware.leveldb.dao.LevelDbUserDao;
import org.iq80.leveldb.*;

import static org.iq80.leveldb.impl.Iq80DBFactory.*;

import java.io.*;

public class LevelDbEnv implements DbEnv {
	private String dbPath;
	private DB db;

    private UserDao userDao;
    private AbstractDao abstractDao;
	
	public LevelDbEnv(String dbPath) {
		this.dbPath = dbPath;
	}
	
	public void connect()  {
		Options options = new Options();
		options.createIfMissing(true);
        try {
            db = factory.open(new File(dbPath), options);
        } catch (IOException e) {
            e.printStackTrace();
        }

        userDao = new LevelDbUserDao(db);
        abstractDao = new LevelDbAbstractDao(db);
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

    public UserDao getUserDao() {
        return userDao;
    }

    public AbstractDao getAbstractDao() {
        return abstractDao;
    }
}
