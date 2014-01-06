package no.haagensoftware.db;

import com.dkhenry.RethinkDB.errors.RqlDriverException;

/**
 * Created by jhsmbp on 1/5/14.
 */
public interface DbEnv {
    void connect() throws RqlDriverException;

    UserDao getUserDao();

    AbstractDao getAbstractDao();
}
