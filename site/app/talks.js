ECE.TalksRoute = Ember.Route.extend({
    model: function() {
        return ECE.Talk.findAll();
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/talks"]);

        document.title = 'Talks - Ember Fest';
    }
});

ECE.TalksTalkRoute = Ember.Route.extend({
    model: function(id) {
        return ECE.Talk.find(id.talk_id)
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/talks/" + model.get('id')]);

        document.title = model.get('talkTitle') + ' - Ember Fest';
    }
});


ECE.TalksController = Ember.ArrayController.extend({

});

ECE.TalksIndexController = Ember.ArrayController.extend({
    needs: ['talks'],

    isAdmin: function() {
        return ECE.get('authLevel') === 'admin' || ECE.get('authLevel') === 'root'
    }.property('ECE.authLevel'),

    deleteTalk: function(a) {
        console.log('delete task: ' + a.get('id'));
        ECE.Talk.delete(a.get('id'));
    }
});

Ember.TEMPLATES['talks'] = Ember.Handlebars.compile('{{outlet}}');

Ember.TEMPLATES['talks/index'] = Ember.Handlebars.compile('' +
    '<div class="markdownArea"><h1>Proposed Talks</h1>' +
    '{{#each controllers.talks}}' +
        '<div class="well well-small talkTitle">' +
            '{{#linkTo "talks.talk" this}}<button class="btn btn-primary pull-right">View Proposal</button>{{/linkTo}}' +
            '{{talkTitle}}<br>' +
            'Suggested by {{talkSuggestedBy}}' +

            '{{#if controller.isAdmin}}' +
                '<br /><button class="btn btn-primary" {{action "deleteTalk" this}}>Delete Proposal</button>' +
            '{{/if}}' +
        '</div>' +
    '{{/each}}</div>'
);

Ember.TEMPLATES['talks/talk'] = Ember.Handlebars.compile('' +
    '<div class="markdownArea">' +
        '<h1>{{talkTitle}}</h1>' +
        '<div><h2>Abstract</h2>{{talkText}}</div>' +
        '<div><h2>Talk Type</h2>{{talkType}}</div>' +
        '<div><h2>Talk Topics</h2>{{talkTopics}}</div>' +
        '<div>{{#linkTo "talks"}}<<- Back to Talks{{/linkTo}}</div>' +
    '</div>'
);