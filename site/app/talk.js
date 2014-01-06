Emberfest.Talk = DS.Model.extend({
    title: DS.attr('string'),
    talkAbstract: DS.attr('string'),
    talkType: DS.attr('string'),
    topics: DS.attr('string'),
    outline: DS.attr('string'),
    participantRequirements: DS.attr('string'),
    comments: DS.attr('string'),
    talkSuggestedBy: DS.attr('string'),
    talkBy: DS.attr('string')
});