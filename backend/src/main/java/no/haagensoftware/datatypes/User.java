package no.haagensoftware.datatypes;

import java.util.List;
import org.codehaus.jackson.annotate.JsonProperty;

public class User {
    private String id;
	private String userId;
	private String authenticationToken;
	private String fullName;
	private String company;
	private String phone;
    private String dietaryRequirements;
    private String countryOfResidence;
    private String yearOfBirth;
    private Boolean attendingDinner;
	private String userLevel;
	private Long loginExpires;

	
	public User() {
	
	}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDietaryRequirements() {
        return dietaryRequirements;
    }

    public void setDietaryRequirements(String dietaryRequirements) {
        this.dietaryRequirements = dietaryRequirements;
    }

    public String getCountryOfResidence() {
        return countryOfResidence;
    }

    public void setCountryOfResidence(String countryOfResidence) {
        this.countryOfResidence = countryOfResidence;
    }

    public String getYearOfBirth() {
        return yearOfBirth;
    }

    public void setYearOfBirth(String yearOfBirth) {
        this.yearOfBirth = yearOfBirth;
    }

    public Boolean getAttendingDinner() {
        return attendingDinner;
    }

    public void setAttendingDinner(Boolean attendingDinner) {
        this.attendingDinner = attendingDinner;
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
