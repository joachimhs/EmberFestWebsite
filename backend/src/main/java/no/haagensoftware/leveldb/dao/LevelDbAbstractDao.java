package no.haagensoftware.leveldb.dao;

import static org.iq80.leveldb.impl.Iq80DBFactory.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import no.haagensoftware.datatypes.Talk;
import no.haagensoftware.db.AbstractDao;

import org.apache.log4j.Logger;
import org.iq80.leveldb.DB;
import org.iq80.leveldb.DBIterator;

import com.google.gson.Gson;

public class LevelDbAbstractDao implements AbstractDao {
	private Logger logger = Logger.getLogger(LevelDbAbstractDao.class.getName());
	private DB db;

    public LevelDbAbstractDao(DB db) {
        this.db = db;
    }

    @Override
    public void persistAbstract(Talk talk) {
		db.put(bytes("talk_" + talk.getAbstractId()), bytes(new Gson().toJson(talk)));
	}
	
	@Override
    public Talk getAbstract(String abstractId) {
		String json = asString(db.get(bytes("talk_" + abstractId)));
		Talk talk = new Gson().fromJson(json, Talk.class);
		return talk;
	}
	
	@Override
    public List<Talk> getAbstracts() {
		List<Talk> abstractList = new ArrayList<>();
		DBIterator iterator = db.iterator();
		try {
			for(iterator.seekToFirst(); iterator.hasNext(); iterator.next()) {
				if (asString(iterator.peekNext().getKey()).startsWith("talk_")) {
					String json = asString(iterator.peekNext().getValue());
					logger.info("talk: " + json);
					abstractList.add(new Gson().fromJson(json, Talk.class));
				}
			}
		} finally {
			try {
				iterator.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		return abstractList;
	}

    public List<Talk> getAbstractsForUser(String userId) {
        List<Talk> allAbstracts = getAbstracts();
        List<Talk> userAbstracts = new ArrayList<>();

        for (Talk talk : allAbstracts) {
            if (talk.getUserId().equals(userId)) {
                userAbstracts.add(talk);
            }
        }

        return userAbstracts;

    }
	
	@Override
    public void deleteAbstract(String abstractId) {
		db.delete(("talk_" + abstractId).getBytes());
	}
}
