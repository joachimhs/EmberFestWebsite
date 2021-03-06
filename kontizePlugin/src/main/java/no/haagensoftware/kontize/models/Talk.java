package no.haagensoftware.kontize.models;

/**
 * Created by jhsmbp on 1/24/14.
 */
public class Talk {
    private String abstractId;
    private String userId;
    private String title;
    private String talkAbstract;
    private String talkIntendedAudience;
    private String topics;
    private String talkType;
    private String outline;
    private String participantRequirements;
    private String comments;
    private String video;

    public Talk() {

    }

    public String getAbstractId() {
        return abstractId;
    }

    public void setAbstractId(String abstractId) {
        this.abstractId = abstractId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTalkAbstract() {
        return talkAbstract;
    }

    public void setTalkAbstract(String talkAbstract) {
        this.talkAbstract = talkAbstract;
    }

    public String getTopics() {
        return topics;
    }

    public void setTopics(String topics) {
        this.topics = topics;
    }

    public String getTalkType() {
        return talkType;
    }

    public void setTalkType(String talkType) {
        this.talkType = talkType;
    }

    public String getOutline() {
        return outline;
    }

    public void setOutline(String outline) {
        this.outline = outline;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public String getParticipantRequirements() {
        return participantRequirements;
    }

    public void setParticipantRequirements(String participantRequirements) {
        this.participantRequirements = participantRequirements;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getTalkIntendedAudience() {
        return talkIntendedAudience;
    }

    public void setTalkIntendedAudience(String talkIntendedAudience) {
        this.talkIntendedAudience = talkIntendedAudience;
    }
}
