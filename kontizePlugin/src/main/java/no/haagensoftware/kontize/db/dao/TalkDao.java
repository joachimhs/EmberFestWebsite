package no.haagensoftware.kontize.db.dao;

import com.google.gson.JsonPrimitive;
import no.haagensoftware.contentice.data.SubCategoryData;
import no.haagensoftware.contentice.spi.StoragePlugin;
import no.haagensoftware.kontize.models.Talk;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by jhsmbp on 1/28/14.
 */
public class TalkDao {
    private StoragePlugin storagePlugin;

    public TalkDao(StoragePlugin storagePlugin) {
        this.storagePlugin = storagePlugin;
    }

    public List<Talk> getTalks(String host) {
        List<Talk> talks = new ArrayList<>();

        for (SubCategoryData subCategoryData : storagePlugin.getSubCategories(host, "talks")) {
            talks.add(convertSubcategoryToTalk(subCategoryData));
        }

        return talks;
    }

    public List<Talk> getTalksForUser(String host, String userId) {
        List<Talk> talksForUser = new ArrayList<>();

        for (Talk talk : getTalks(host)) {
            if (talk.getUserId().equals(userId)) {
                talksForUser.add(talk);
            }
        }

        return talksForUser;
    }

    public Talk getTalk(String host, String subcategory) {
        Talk talk = null;

        SubCategoryData subCategoryData = storagePlugin.getSubCategory(host, "talks", subcategory);

        if (subCategoryData != null) {
            talk = convertSubcategoryToTalk(subCategoryData);
        }

        return talk;
    }

    public Talk convertSubcategoryToTalk(SubCategoryData subCategoryData) {
        Talk talk = new Talk();

        talk.setAbstractId(subCategoryData.getId());
        if (talk.getAbstractId().startsWith("talks_")) {
            talk.setAbstractId(talk.getAbstractId().substring(6));
        }

        talk.setTalkIntendedAudience(subCategoryData.getValueForKey("talkIntendedAudience"));
        talk.setComments(subCategoryData.getValueForKey("comments"));
        talk.setOutline(subCategoryData.getValueForKey("outline"));
        talk.setParticipantRequirements(subCategoryData.getValueForKey("participantRequirements"));
        talk.setTalkAbstract(subCategoryData.getContent());
        talk.setTitle(subCategoryData.getValueForKey("title"));
        talk.setTalkType(subCategoryData.getValueForKey("talkType"));
        talk.setTopics(subCategoryData.getValueForKey("topics"));
        talk.setUserId(subCategoryData.getValueForKey("userId"));
        talk.setVideo(subCategoryData.getValueForKey("video"));
        return talk;
    }

    public void storeTalk(String host, Talk talk, String userId) {
        SubCategoryData subCategoryData = new SubCategoryData();
        subCategoryData.setId(talk.getAbstractId());
        subCategoryData.getKeyMap().put("abstractId", new JsonPrimitive(talk.getAbstractId()));

        subCategoryData.setContent(talk.getTalkAbstract());
        subCategoryData.getKeyMap().put("userId", new JsonPrimitive(userId));

        if (talk.getTalkIntendedAudience() != null) {
            subCategoryData.getKeyMap().put("talkIntendedAudience", new JsonPrimitive(talk.getTalkIntendedAudience()));
        }

        if (talk.getComments() != null) {
            subCategoryData.getKeyMap().put("comments", new JsonPrimitive(talk.getComments()));
        }

        if (talk.getOutline() != null) {
            subCategoryData.getKeyMap().put("outline", new JsonPrimitive(talk.getOutline()));
        }

        if (talk.getParticipantRequirements() != null) {
            subCategoryData.getKeyMap().put("participantRequirements", new JsonPrimitive(talk.getParticipantRequirements()));
        }

        if (talk.getTitle() != null) {
            subCategoryData.getKeyMap().put("title", new JsonPrimitive(talk.getTitle()));
        }

        if (talk.getTalkType() != null) {
            subCategoryData.getKeyMap().put("talkType", new JsonPrimitive(talk.getTalkType()));
        }

        if (talk.getTopics() != null) {
            subCategoryData.getKeyMap().put("topics", new JsonPrimitive(talk.getTopics()));
        }

        if (talk.getVideo() != null) {
            subCategoryData.getKeyMap().put("video", new JsonPrimitive(talk.getVideo()));
        }

        storagePlugin.setSubCategory(host, "talks", subCategoryData.getId(), subCategoryData);
    }

    public void deleteTalk(String host, String talkId) {
        storagePlugin.deleteSubcategory(host, "talks", talkId);
    }
}
