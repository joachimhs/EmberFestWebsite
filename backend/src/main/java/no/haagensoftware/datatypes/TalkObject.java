package no.haagensoftware.datatypes;

import no.haagensoftware.netty.webserver.SubmittedTalk;

/**
 * Created by jhsmbp on 1/5/14.
 */
public class TalkObject {
    private SubmittedTalk talk;

    public TalkObject() {
    }

    public SubmittedTalk getTalk() {
        return talk;
    }

    public void setTalk(SubmittedTalk talk) {
        this.talk = talk;
    }
}
