ECE.PagesCallForSpeakersRoute = Ember.Route.extend({
    model: function() {
        var model = Ember.Object.create();

        $.get('/mrkdwn/cfs.md', function(data) {
            var converter = new Showdown.converter();

            model.set('markdown', new Handlebars.SafeString(converter.makeHtml(data)));
        }, "text").error(function() {
                page.set('markdown',  "Unable to find specified page");
                //TODO: Navigate to 404 state
            });

        return model;
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/call_for_speakers/"]);

        document.title = 'Call For Speakers - Ember Fest';
    }
});

ECE.PagesCallForSpeakersController = Ember.ObjectController.extend({
    needs: ['user'],

    titleValidationError: null,
    proposalValidationError: null,
    proposalTypeValidationError: null,
    topicsValidationError: null,

    submitAbstract: function() {
        var validated = true;
        if (!this.validateFieldContent(this.get('content.proposalTitle'), 10)) {
            this.set('titleValidationError', 'Proposal Title must contain at least 10 characters!');
            validated = false;
        } else {
            this.set('titleValidationError', null);
        }

        if (!this.validateFieldContent(this.get('content.proposalText'), 10)) {
            this.set('proposalValidationError', 'Proposal Content must contain at least 100 characters!');
            validated = false;
        } else {
            this.set('proposalValidationError', null);
        }

        if (!this.validateFieldContent(this.get('content.proposalType'), 2)) {
            this.set('proposalTypeValidationError', 'Proposal Type must contain at least 2 characters!');
            validated = false;
        } else {
            this.set('proposalTypeValidationError', null);
        }

        if (!this.validateFieldContent(this.get('content.proposalTopics'), 5)) {
            this.set('topicsValidationError', 'Proposal Topics must contain at least 5 characters!');
            validated = false;
        } else {
            this.set('topicsValidationError', null);
        }

        if (validated) {
            var talkId = Math.uuid(16, 16);
            var talk = ECE.Talk.create({
                id: talkId,
                talkTitle: this.get('content.proposalTitle'),
                talkText: this.get('content.proposalText'),
                talkType: this.get('content.proposalType'),
                talkTopics: this.get('content.proposalTopics')
            });

            ECE.Talk.createRecord(talk);

            this.transitionToRoute('talks');
        }
    },

    validateFieldContent: function(fieldContent, length) {
        return (fieldContent != null && fieldContent.length >= length);
    }
});

Ember.TEMPLATES['pages/callForSpeakers'] = Ember.Handlebars.compile('' +
    '<div class="markdownArea">' +
    '{{markdown}}' +
    '{{#if controllers.user.isLoggedIn}}' +
        '<form class="form-horizontal">' +
            '<div class="control-group">' +
                '<label class="control-label" for="proposalTitle">Title</label>' +
                '<div class="controls">' +
                    '{{view Ember.TextField valueBinding="proposalTitle" classNames="span5"}}' +
                    '{{#if titleValidationError}}' +
                        '<span class="help-inline">{{titleValidationError}}</span>' +
                    '{{/if}}' +
                '</div>' +
            '</div>' +
            '<div class="control-group">' +
                '<label class="control-label" for="proposalText">Proposal</label>' +
                '<div class="controls">' +
                    '{{view Ember.TextArea valueBinding="proposalText" rows="20" classNames="span5"}}' +
                    '{{#if proposalValidationError}}' +
                        '<span class="help-inline">{{proposalValidationError}}</span>' +
                    '{{/if}}' +
                '</div>' +
            '</div>' +
            '<div class="control-group">' +
                '<label class="control-label" for="proposalType">Proposal Type</label>' +
                '<div class="controls">' +
                    '{{view Ember.TextField valueBinding="proposalType" rows="20" classNames="span5" placeholder="20 or 35 minute talk, or tutorial"}}' +
                    '{{#if proposalTypeValidationError}}' +
                        '<span class="help-inline">{{proposalTypeValidationError}}</span>' +
                    '{{/if}}' +
                '</div>' +
            '</div>' +
            '<div class="control-group">' +
                '<label class="control-label" for="topics">Topics</label>' +
                '<div class="controls">' +
                    '{{view Ember.TextField valueBinding="proposalTopics" rows="20" classNames="span5" placeholder="A comma separated keyword-list"}}' +
                    '{{#if topicsValidationError}}' +
                        '<span class="help-inline">{{topicsValidationError}}</span>' +
                    '{{/if}}' +
                '</div>' +
            '</div>' +
        '<div class="form-actions" style="background: none;">' +
            '<button type="submit" class="btn btn-primary" {{action "submitAbstract"}}>Submit Proposal</button>' +
        '</div>' +
    '</form>' +
    '</div>' +
    '{{else}}' +
        '<p>You need to log in, in order to propose a talk.</p>' +
    '{{/if}}' +
    '<div class="container-fluid"><div class="span12 footer"><a href="https://twitter.com/EmberFest"><i class="icon-2x icon-twitter"></i></a><a href="https://github.com/joachimhs/EmberFestWebsite" class="github"><i class="icon-2x icon-github"></i></a></div>'
);