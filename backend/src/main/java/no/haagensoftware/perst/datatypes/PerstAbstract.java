package no.haagensoftware.perst.datatypes;

public class PerstAbstract {
	private String abstractId;
	private String userId;
	private String abstractTitle;
	private String abstractContent;
	private String abstractType;
	private String abstractTopics;
	
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
	
	public String getAbstractTopics() {
		return abstractTopics;
	}
	
	public void setAbstractTopics(String abstractTopics) {
		this.abstractTopics = abstractTopics;
	}
	
	public String getAbstractType() {
		return abstractType;
	}
	
	public void setAbstractType(String abstractType) {
		this.abstractType = abstractType;
	}
}
