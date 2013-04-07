package no.haagensoftware.perst.datatypes;

import org.garret.perst.Persistent;

public class PerstAbstract extends Persistent {
	private String abstractId;
	private String userId;
	private String abstractTitle;
	private String abstractContent;
	
	public PerstAbstract() {
		
	}
	
	public String getAbstractId() {
		return abstractId;
	}
	
	public void setAbstractId(String abstractId) {
		this.abstractId = abstractId;
	}
	
	public String getAbstractContent() {
		return abstractContent;
	}
	
	public void setAbstractContent(String abstractContent) {
		this.abstractContent = abstractContent;
	}
	
	public String getAbstractTitle() {
		return abstractTitle;
	}
	
	public void setAbstractTitle(String abstractTitle) {
		this.abstractTitle = abstractTitle;
	}
	
	public String getUserId() {
		return userId;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}
}
