Emberfest.TalksTalkController = Ember.ObjectController.extend({
    titleValidationError: null,
    proposalValidationError: null,
    proposalTypeValidationError: null,
    topicsValidationError: null,

    actions: {
        submitTalk: function() {
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
                var talk = this.get('content');
                Emberfest.Talk.updateRecord(talk);

                this.transitionToRoute('talks');
            }
        }
    }
});