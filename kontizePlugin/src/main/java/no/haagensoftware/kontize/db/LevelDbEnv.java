package no.haagensoftware.kontize.db;

import no.haagensoftware.kontize.db.dao.AbstractDao;
import no.haagensoftware.kontize.db.dao.UserDao;
import org.iq80.leveldb.DB;
import org.iq80.leveldb.Options;

import java.io.File;
import java.io.IOException;

import static org.iq80.leveldb.impl.Iq80DBFactory.factory;

/**
 * Created by jhsmbp on 1/24/14.
 */
public class LevelDbEnv {
    private static LevelDbEnv levelDbEnv;

    private String dbPath;
    private DB db;

    private UserDao userDao;
    private AbstractDao abstractDao;

    private LevelDbEnv() {
        this.dbPath = System.getProperty("com.embercampeurope.db.path");
    }

    public static LevelDbEnv getInstance() {
        if (levelDbEnv == null) {
            levelDbEnv = new LevelDbEnv();
            levelDbEnv.connect();
        }

        return levelDbEnv;
    }

    public void connect()  {
        Options options = new Options();
        options.createIfMissing(true);
        try {
            db = factory.open(new File(dbPath), options);
        } catch (IOException e) {
            e.printStackTrace();
        }

        userDao = new UserDao(db);
        abstractDao = new AbstractDao(db);
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
