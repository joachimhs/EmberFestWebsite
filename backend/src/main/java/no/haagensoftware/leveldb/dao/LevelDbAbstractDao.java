package no.haagensoftware.leveldb.dao;

import static org.iq80.leveldb.impl.Iq80DBFactory.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import no.haagensoftware.perst.datatypes.PerstAbstract;

import org.apache.log4j.Logger;
import org.iq80.leveldb.DB;
import org.iq80.leveldb.DBIterator;

import com.google.gson.Gson;

public class LevelDbAbstractDao {
	private Logger logger = Logger.getLogger(LevelDbAbstractDao.class.getName());
	
	public void persistAbstract(DB db, PerstAbstract perstAbstract) {
		db.put(bytes("talk_" + perstAbstract.getAbstractId()), bytes(new Gson().toJson(perstAbstract)));
	}
	
	public PerstAbstract getAbstract(DB db, String abstractId) {
		String json = asString(db.get(bytes("talk_" + abstractId)));
		PerstAbstract talk = new Gson().fromJson(json, PerstAbstract.class);
		return talk;
	}
	
	public List<PerstAbstract> getAbstracts(DB db) {
		List<PerstAbstract> abstractList = new ArrayList<>();
		DBIterator iterator = db.iterator();
		try {
			for(iterator.seekToFirst(); iterator.hasNext(); iterator.next()) {
				if (asString(iterator.peekNext().getKey()).startsWith("talk_")) {
					String json = asString(iterator.peekNext().getValue());
					logger.info("talk: " + json);
					abstractList.add(new Gson().fromJson(json, PerstAbstract.class));
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
	
	public void deleteAbstract(DB db, String abstractId) {
		db.delete(("talk_" + abstractId).getBytes());
	}
}
