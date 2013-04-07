package org.haagensoftware.netty.webserver.util;

import java.util.Hashtable;

public class ContentTypeUtil {
	private static Hashtable<String, String> contentTypeHash = new Hashtable<String, String>();
	
	static {
		contentTypeHash.put("png", "image/png");
		contentTypeHash.put("PNG", "image/png");
		contentTypeHash.put("txt", "text/plain");
		contentTypeHash.put("text", "text/plain");
		contentTypeHash.put("TXT", "text/plain");
		contentTypeHash.put("js", "application/javascript");
		contentTypeHash.put("jpg", "image/jpeg");
		contentTypeHash.put("jpeg", "image/jpeg");
		contentTypeHash.put("JPG", "image/jpeg");
		contentTypeHash.put("JPEG", "image/jpeg");
		contentTypeHash.put("css", "text/css");
		contentTypeHash.put("CSS", "text/css");
		contentTypeHash.put("json", "text/json");
		contentTypeHash.put("html", "text/html");
		contentTypeHash.put("htm", "text/html");
	}
	
	public static String getContentType(String filename) {
		String fileEnding = filename.substring(filename.lastIndexOf(".")+1);
		System.out.println(fileEnding);
		if (contentTypeHash.get(fileEnding) != null) {
			return contentTypeHash.get(fileEnding);
		}
		
		return "text/plain";
	}
}