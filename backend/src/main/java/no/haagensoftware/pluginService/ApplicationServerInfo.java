package no.haagensoftware.pluginService;

import no.haagensoftware.netty.webserver.ServerInfo;
import org.haagensoftware.netty.webserver.spi.PropertyConstants;

public class ApplicationServerInfo implements ServerInfo {
	private String webappdir;
    private String documentsdir;
	
	public ApplicationServerInfo() {
		webappdir = System.getProperty(PropertyConstants.WEBAPP_DIR);
	}
	
	@Override
	public String getWebappPath() {
		return webappdir;
	}

    @Override
    public String getDocumentsPath() {
        return documentsdir;
    }
}
