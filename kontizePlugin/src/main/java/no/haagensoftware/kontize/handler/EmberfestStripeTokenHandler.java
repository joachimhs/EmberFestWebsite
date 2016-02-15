package no.haagensoftware.kontize.handler;

import com.google.gson.Gson;
import com.stripe.model.Token;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.FullHttpRequest;
import no.haagensoftware.contentice.handler.ContenticeHandler;
import org.apache.log4j.Logger;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by jhsmbp on 30/05/15.
 */
public class EmberfestStripeTokenHandler extends ContenticeHandler {
    private static final Logger logger = Logger.getLogger(EmberfestStripeTokenHandler.class.getName());
    @Override
    protected void channelRead0(ChannelHandlerContext channelHandlerContext, FullHttpRequest fullHttpRequest) throws Exception {
        String messageContent = getHttpMessageContent(fullHttpRequest);

        logger.info("Stripe Token Handler");

        Map<String, Object> tokenParams = new HashMap<String, Object>();

        Token token = Token.create(tokenParams);

        logger.info(new Gson().toJson(token));

        writeContentsToBuffer(channelHandlerContext, new Gson().toJson(token).toString(), "application/json");
    }
}
