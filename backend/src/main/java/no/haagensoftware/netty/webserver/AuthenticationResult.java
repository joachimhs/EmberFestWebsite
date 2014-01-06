package no.haagensoftware.netty.webserver;

public class AuthenticationResult {
	private String uuidToken;
    private String userId;
	private boolean uuidValidated = false;
	private String statusMessage;
	
	public AuthenticationResult() {
		uuidValidated = false;
	}
	
	public String getUuidToken() {
		return uuidToken;
	}
	
	public void setUuidToken(String uuidToken) {
		this.uuidToken = uuidToken;
	}
	
	public String getStatusMessage() {
		return statusMessage;
	}
	
	public void setStatusMessage(String statusMessage) {
		this.statusMessage = statusMessage;
	}
	
	public boolean isUuidValidated() {
		return uuidValidated;
	}
	
	public void setUuidValidated(boolean uuidValidated) {
		this.uuidValidated = uuidValidated;
	}

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
