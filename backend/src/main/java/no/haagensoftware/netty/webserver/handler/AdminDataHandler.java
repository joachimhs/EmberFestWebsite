package no.haagensoftware.netty.webserver.handler;

import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.MessageEvent;

/**
 * Created by jhsmbp on 1/24/14.
 */
public class AdminDataHandler extends FileServerHandler {

    public AdminDataHandler(String path) {
        super(path);
    }

    @Override
    public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) throws Exception {

    }
}
