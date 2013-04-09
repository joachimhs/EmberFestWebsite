ECE.TalksRoute = Ember.Route.extend({
    model: function() {
        return ECE.Talk.findAll();
    }
});

ECE.TalksController = Ember.ArrayController.extend({

});

ECE.TalksIndexController = Ember.ArrayController.extend({
    needs: ['talks']
});

Ember.TEMPLATES['talks/index'] = Ember.Handlebars.compile('' +
    '<h1>TALKS</h1>' +
    '{{#each controllers.talks}}' +
        '<div class="well well-small talkTitle">' +
            '{{#linkTo "talks.talk" this}}<button class="btn btn-primary pull-right">View Proposal</button>{{/linkTo}}' +
            '{{id}} - {{talkTitle}}<br>' +
            'Suggested by {{talkSuggestedBy}}' +

        '</div>' +
    '{{/each}}'
);

Ember.TEMPLATES['talks/talk'] = Ember.Handlebars.compile('' +
    '<h1>{{id}} - {{talkTitle}}</h1>' +
    '<div>{{talkText}}</div>' +
    '<div>{{talkType}}</div>' +
    '<div>{{talkTopics}}</div>' +
    '<div>{{#linkTo "talks"}}<<- Back to Talks{{/linkTo}}</div>'
);