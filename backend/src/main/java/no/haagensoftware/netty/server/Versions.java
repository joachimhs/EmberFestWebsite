package no.haagensoftware.netty.server;

import java.util.List;

public class Versions {
	private String currentVersion;
	private List<Version> versions;
	
	public String getCurrentVersion() {
		return currentVersion;
	}
	
	public void setCurrentVersion(String currentVersion) {
		this.currentVersion = currentVersion;
	}
	
	public List<Version> getVersions() {
		return versions;
	}
	
	public void setVersions(List<Version> versions) {
		this.versions = versions;
	}
	
	
}
