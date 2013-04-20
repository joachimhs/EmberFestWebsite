package no.haagensoftware.netty.webserver;

public class SubmittedTalk {
	private String id;
	private String talkTitle;
	private String talkText;
	private String talkType;
	private String talkTopics;
	
	public SubmittedTalk() {
		// TODO Auto-generated constructor stub
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}

	public String getTalkTitle() {
		return talkTitle;
	}

	public void setTalkTitle(String talkTitle) {
		this.talkTitle = talkTitle;
	}

	public String getTalkText() {
		return talkText;
	}

	public void setTalkText(String talkText) {
		this.talkText = talkText;
	}

	public String getTalkType() {
		return talkType;
	}

	public void setTalkType(String talkType) {
		this.talkType = talkType;
	}

	public String getTalkTopics() {
		return talkTopics;
	}

	public void setTalkTopics(String talkTopics) {
		this.talkTopics = talkTopics;
	}
	
	
}
