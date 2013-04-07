package no.haagensoftware.netty.webserver.scriptCache;

import java.util.Hashtable;
import java.util.List;

public class ScriptHash {
	private static Hashtable<String, ScriptCache> scriptHash = new Hashtable<String, ScriptCache>();
	
	public static ScriptCache updateScriptContents(String htmlFilePath, List<String> scriptFiles, String scriptContents, 
			String htmlContent, long expires) {
		ScriptCache cacheFromHash = scriptHash.get(htmlFilePath);
		if (cacheFromHash != null) {
			//Remove the old script cache
			scriptHash.remove(htmlFilePath);
		}
		
		cacheFromHash = new ScriptCache(scriptFiles, scriptContents, htmlFilePath, htmlContent, expires);		
		scriptHash.put(htmlFilePath, cacheFromHash);
		return cacheFromHash;
	}
	
	public static ScriptCache getScriptCache(String htmlFilePath) {
		return scriptHash.get(htmlFilePath);
	}
}
