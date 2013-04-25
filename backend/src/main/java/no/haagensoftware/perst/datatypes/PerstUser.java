package no.haagensoftware.perst.datatypes;

public class PerstUser {
	private String userId;
	private String authenticationToken;
	private String firstName;
	private String lastName;
	private String homeCountry;
	private String userLevel;
	public Long loginExpires;
	
	public PerstUser() {
	
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getAuthenticationToken() {
		return authenticationToken;
	}

	public void setAuthenticationToken(String authenticationToken) {
		this.authenticationToken = authenticationToken;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getHomeCountry() {
		return homeCountry;
	}

	public void setHomeCountry(String homeCountry) {
		this.homeCountry = homeCountry;
	}
	
	public String getUserLevel() {
		return userLevel;
	}
	
	public void setUserLevel(String userLevel) {
		this.userLevel = userLevel;
	}
	
	public Long getLoginExpires() {
		return loginExpires;
	}
	
	public void setLoginExpires(Long loginExpires) {
		this.loginExpires = loginExpires;
	}
}
