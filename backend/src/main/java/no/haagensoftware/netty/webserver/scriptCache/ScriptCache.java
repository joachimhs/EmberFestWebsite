package no.haagensoftware.netty.webserver.scriptCache;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.util.List;

import org.haagensoftware.netty.webserver.util.JSMin;
import org.haagensoftware.netty.webserver.util.JSMin.UnterminatedCommentException;
import org.haagensoftware.netty.webserver.util.JSMin.UnterminatedRegExpLiteralException;
import org.haagensoftware.netty.webserver.util.JSMin.UnterminatedStringLiteralException;

public class ScriptCache {
	private List<String> scriptList;
	private String scriptContents;
	private String htmlFilePath;
	private String htmlContents;
	private String minifiedScriptContents;
	private Long expires = 0l;
	
	public ScriptCache(List<String> scriptList, String scriptContents, String htmlFilePath, String htmlContent, long expires) {
		this.scriptList = scriptList;
		this.scriptContents = scriptContents;
		this.htmlFilePath = htmlFilePath;
		this.htmlContents = htmlContent;
		this.expires = expires;
		minifiedScriptContents = "";
		
		InputStream in;
		try {
			in = new ByteArrayInputStream(scriptContents.getBytes("UTF-8"));
			OutputStream out = new ByteArrayOutputStream();
			
			JSMin jsmin = new JSMin(in, out);
			jsmin.jsmin();
			
			minifiedScriptContents = new String(out.toString());
			/*minifiedScriptContents = minifiedScriptContents.replaceAll("ÃÂµ", "mu");
			minifiedScriptContents = minifiedScriptContents.replaceAll("Âµ", "mu");
			minifiedScriptContents = minifiedScriptContents.replaceAll("ÃÂ", "sigma");
			minifiedScriptContents = minifiedScriptContents.replaceAll("Ï", "sigma");*/
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnterminatedRegExpLiteralException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnterminatedCommentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnterminatedStringLiteralException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public boolean isExpired() {
		return expires <= System.currentTimeMillis();
	}
	
	public String getHtmlFilePath() {
		return htmlFilePath;
	}
	
	public String getScriptContents() {
		return scriptContents;
	}
	public List<String> getScriptList() {
		return scriptList;
	}
	
	public Long getExpires() {
		return expires;
	}
	
	public String getHtmlContents() {
		return htmlContents;
	}
	
	public String getMinifiedScriptContents() {
		return minifiedScriptContents;
	}
}
