package no.haagensoftware.netty.server;

import org.jboss.netty.channel.ChannelPipeline;
import org.jboss.netty.channel.ChannelPipelineFactory;

public class ServerPipeline implements ChannelPipelineFactory {
	private ChannelPipeline channelPipeline;
	
	public ServerPipeline(ChannelPipeline channelPipeline) {
		this.channelPipeline = channelPipeline;
	}
	
	@Override
	public ChannelPipeline getPipeline() throws Exception {
		return channelPipeline;
	}
}
