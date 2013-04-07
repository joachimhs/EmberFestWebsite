package no.haagensoftware.perst;

import no.haagensoftware.perst.datatypes.PerstAbstract;
import no.haagensoftware.perst.datatypes.PerstUser;

import org.garret.perst.FieldIndex;
import org.garret.perst.Persistent;
import org.garret.perst.Storage;

public class PerstStorageRoot extends Persistent {
	private FieldIndex<PerstUser> userIndex;
	private FieldIndex<PerstAbstract> abstractIndex;
	
	public PerstStorageRoot(Storage storage) {
		super(storage);
		
		userIndex = storage.createFieldIndex(PerstUser.class, "userId", true);
		abstractIndex = storage.createFieldIndex(PerstAbstract.class, "abstractId", true);
	}
	
	public FieldIndex<PerstUser> getUserIndex() {
		return userIndex;
	}
	
	public FieldIndex<PerstAbstract> getAbstractIndex() {
		return abstractIndex;
	}
	
}
