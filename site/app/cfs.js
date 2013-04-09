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
    }
});

ECE.PagesCallForSpeakersController = Ember.ObjectController.extend({
    needs: ['application'],

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
            $.ajax({
                type: 'POST',
                url: '/abstracts',
                dataType: "json",
                data: JSON.stringify({talkId: Math.uuid(16, 16), talkTitle: this.get('content.proposalTitle'), talkText: this.get('content.proposalText'), talkType: this.get('content.proposalType'), talkTopics: this.get('content.proposalTopics')}),
                success: function(res, status, xhr) {
                    if (res.submitted) {
                        alert('Congratulations! Your proposed talk is registered!');
                    } else {
                        alert('Unable to register your talk. Error message: ' + res.error);
                    }
                },
                error: function(xhr, status, err) { alert('Unable to register your proposal: ' + err); console.log(xhr); console.log(xhr.error()); console.log(status); }
            });
        }
    },

    validateFieldContent: function(fieldContent, length) {
        return (fieldContent != null && fieldContent.length >= length);
    }
});

Ember.TEMPLATES['pages/callForSpeakers'] = Ember.Handlebars.compile('' +
    '<h1>Submit your Proposal!</h1>' +
    '{{markdown}}' +
    '{{#if controllers.application.showLogin}}' +
        '<p>You need to log in, in order to submit an abstract.</p>' +
    '{{else}}' +
        '<form class="form-horizontal">' +
            '<div class="control-group">' +
                '<label class="control-label" for="proposalTitle">Title</label>' +
                '<div class="controls">' +
                    '{{view Ember.TextField valueBinding="proposalTitle" classNames="span5"}}' +
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
                    '{{view Ember.TextArea valueBinding="proposalText" rows="20" classNames="span5"}}' +
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
                    '{{view Ember.TextField valueBinding="proposalType" rows="20" classNames="span5"}}' +
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
                    '{{view Ember.TextField valueBinding="proposalTopics" rows="20" classNames="span5"}}' +
                    '{{#if topicsValidationError}}' +
                        '<span class="help-inline">{{topicsValidationError}}</span>' +
                    '{{else}}' +
                        '<span class="help-inline">A comma separated keyword-list</span>' +
                    '{{/if}}' +
                '</div>' +
            '</div>' +
        '<div class="form-actions" style="background: none;">' +
            '<button type="submit" class="btn btn-primary" {{action "submitAbstract"}}>Submit Proposal!</button>' +
        '</div>' +
    '</form>' +
    '{{/if}}');