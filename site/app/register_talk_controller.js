Emberfest.RegisterTalkController = Ember.Controller.extend({
    needs: ['user'],

    actions: {
        verifyTalkInput: function() {
            this.verifyInput();
        },

        doLogIn: function() {
            console.log('doLogIn Action');
            navigator.id.request();
        }
    },
    validationErrors: [],


    verifyInput: function() {
        this.set('validationErrors', []);
        if (!this.validateFieldContent(this.get('title'), 10)) {
            this.get('validationErrors').pushObject('Your talk title must contain at least 10 characters!');
        }
        if (!this.validateFieldContent(this.get('talkAbstract'), 50)) {
            this.get('validationErrors').pushObject('Your talk abstract must contain at least 50 characters!');
        }
        if (!this.validateFieldContent(this.get('talkType'), 2)) {
            this.get('validationErrors').pushObject('Your talk type must contain at least 2 characters!');
        }
        if (!this.validateFieldContent(this.get('topics'), 5)) {
            this.get('validationErrors').pushObject('Your talk topics must contain at least 5 characters!');
        }

        if (this.get('validationErrors').length === 0) {
            console.log('registering talk')
            var talkId = Math.uuid(16, 16);
            var talk = this.store.createRecord('talk', {
                id: talkId,
                title: this.get('title'),
                talkAbstract: this.get('talkAbstract'),
                talkType: this.get('talkType'),
                topics: this.get('topics'),
                outline: this.get('outline'),
                participantRequirements: this.get('participantRequirements'),
                comments: this.get('comments')
            });

            talk.save();

            this.transitionToRoute('talks');
        }
    },

    validateFieldContent: function(fieldContent, length) {
        return (fieldContent != null && fieldContent.length >= length);
    }
});