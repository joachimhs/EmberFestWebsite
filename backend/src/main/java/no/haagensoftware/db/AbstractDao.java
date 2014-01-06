package no.haagensoftware.db;

import no.haagensoftware.datatypes.Talk;

import java.util.List;

/**
 * Created by jhsmbp on 1/4/14.
 */
public interface AbstractDao {
    public void persistAbstract(Talk talk);

    public Talk getAbstract(String abstractId);

    public List<Talk> getAbstracts();

    public void deleteAbstract(String abstractId);

    public List<Talk> getAbstractsForUser(String userId);
}
