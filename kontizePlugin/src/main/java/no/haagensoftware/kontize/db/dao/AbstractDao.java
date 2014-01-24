package no.haagensoftware.kontize.db.dao;

import com.google.gson.Gson;
import no.haagensoftware.kontize.models.Talk;
import org.apache.log4j.Logger;
import org.iq80.leveldb.DB;
import org.iq80.leveldb.DBIterator;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.iq80.leveldb.impl.Iq80DBFactory.asString;
import static org.iq80.leveldb.impl.Iq80DBFactory.bytes;

/**
 * Created by jhsmbp on 1/24/14.
 */
public class AbstractDao {
    private Logger logger = Logger.getLogger(AbstractDao.class.getName());
    private DB db;

    public AbstractDao(DB db) {
        this.db = db;
    }

    public void persistAbstract(Talk talk) {
        db.put(bytes("talk_" + talk.getAbstractId()), bytes(new Gson().toJson(talk)));
    }

    public Talk getAbstract(String abstractId) {
        String json = asString(db.get(bytes("talk_" + abstractId)));
        Talk talk = new Gson().fromJson(json, Talk.class);
        return talk;
    }

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

    public void deleteAbstract(String abstractId) {
        db.delete(("talk_" + abstractId).getBytes());
    }
}
