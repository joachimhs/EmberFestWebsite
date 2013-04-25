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
    needs: ['application']
});

ECE.TalksIndexController = Ember.ArrayController.extend({
    needs: ['talks'],

    isAdmin: function() {
        return ECE.get('authLevel') === 'admin' || ECE.get('authLevel') === 'root'
    }.property('ECE.authLevel'),

    deleteTalk: function(a) {
        console.log('delete talk: ' + a.get('id'));
        ECE.Talk.delete(a.get('id'));
    },

    editTalk: function(a) {
        console.log('edit talk: ' + a.get('id'));
    }
});

ECE.TalksTalkController = Ember.ObjectController.extend({
    needs: ['user'],

    titleValidationError: null,
    proposalValidationError: null,
    proposalTypeValidationError: null,
    topicsValidationError: null,

    editTalk: function(a) {
        console.log('TalksTalkController: editTalk: ' + a.get('id'));
        a.set('isEditing', true);
    },

    canEditTalk: function() {
        return this.get('controllers.user.isLoggedIn') && this.get('talkByLoggedInUser');
    }.property('controllers.user.isLoggedIn', 'talkByLoggedInUser'),

    currentlyEditing: function() {
        return this.get('controllers.user.isLoggedIn') && this.get('talkByLoggedInUser') && this.get('isEditing');
    }.property('controllers.user.isLoggedIn', 'talkByLoggedInUser', 'isEditing'),

    submitTalk: function() {
        var validated = true;
        if (!this.validateFieldContent(this.get('content.talkTitle'), 10)) {
            this.set('titleValidationError', 'Talk Title must contain at least 10 characters!');
            validated = false;
        } else {
            this.set('titleValidationError', null);
        }

        if (!this.validateFieldContent(this.get('content.talkText'), 10)) {
            this.set('proposalValidationError', 'Talk Content must contain at least 100 characters!');
            validated = false;
        } else {
            this.set('proposalValidationError', null);
        }

        if (!this.validateFieldContent(this.get('content.talkType'), 2)) {
            this.set('proposalTypeValidationError', 'Talk Type must contain at least 2 characters!');
            validated = false;
        } else {
            this.set('proposalTypeValidationError', null);
        }

        if (!this.validateFieldContent(this.get('content.talkTopics'), 5)) {
            this.set('topicsValidationError', 'Talk Topics must contain at least 5 characters!');
            validated = false;
        } else {
            this.set('topicsValidationError', null);
        }

        if (validated) {
            var talk = this.get('content');
            ECE.Talk.updateRecord(talk);

            this.get('content').set('isEditing', false);
            this.transitionToRoute('talks');
        }
    },

    validateFieldContent: function(fieldContent, length) {
        return (fieldContent != null && fieldContent.length >= length);
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
    '{{#if currentlyEditing}}' +
        '<div class="markdownArea">' +
            '<form class="form-horizontal">' +
                '<div class="control-group">' +
                    '<label class="control-label" for="proposalTitle">Title</label>' +
                    '<div class="controls">' +
                        '{{view Ember.TextField valueBinding="talkTitle" classNames="span5"}}' +
                        '{{#if titleValidationError}}' +
                            '<span class="help-inline">{{titleValidationError}}</span>' +
                        '{{else}}' +
                            '<span class="help-inline">This is your Abstract Title</span>' +
                        '{{/if}}' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="proposalText">Proposal</label>' +
                    '<div class="controls">' +
                        '{{view Ember.TextArea valueBinding="talkText" rows="20" classNames="span5"}}' +
                        '{{#if proposalValidationError}}' +
                            '<span class="help-inline">{{proposalValidationError}}</span>' +
                        '{{else}}' +
                            '<span class="help-inline">This is your Proposals content</span>' +
                        '{{/if}}' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="proposalType">Proposal Type</label>' +
                    '<div class="controls">' +
                        '{{view Ember.TextField valueBinding="talkType" rows="20" classNames="span5"}}' +
                        '{{#if proposalTypeValidationError}}' +
                            '<span class="help-inline">{{proposalTypeValidationError}}</span>' +
                        '{{else}}' +
                            '<span class="help-inline">20 or 35 minute talk, or tutorial</span>' +
                        '{{/if}}' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="topics">Topics</label>' +
                    '<div class="controls">' +
                        '{{view Ember.TextField valueBinding="talkTopics" rows="20" classNames="span5"}}' +
                        '{{#if topicsValidationError}}' +
                            '<span class="help-inline">{{topicsValidationError}}</span>' +
                        '{{else}}' +
                            '<span class="help-inline">A comma separated keyword-list</span>' +
                        '{{/if}}' +
                    '</div>' +
                '</div>' +
                '<div class="form-actions" style="background: none;">' +
                    '<button type="submit" class="btn btn-primary" {{action "submitTalk"}}>Submit Talk!</button>' +
                '</div>' +
            '</form>' +
        '</div>' +
    '{{else}}' +
        '<div class="markdownArea">' +
            '<h1>{{talkTitle}}</h1>' +
            '<div><h2>Abstract</h2>{{talkText}}</div>' +
            '<div><h2>Talk Type</h2>{{talkType}}</div>' +
            '<div><h2>Talk Topics</h2>{{talkTopics}}</div>' +
            '{{#if canEditTalk}}' +
                '<div><h2>Edit Talk</h2><button class="btn btn-primary" {{action "editTalk" this}}>Edit Proposal</button></div>' +
            '{{/if}}' +
            '<div>{{#linkTo "talks"}}<<- Back to Talks{{/linkTo}}</div>' +
        '</div>' +
    '{{/if}}'
);