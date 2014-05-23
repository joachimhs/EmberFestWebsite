Emberfest.RegisterTalkComponent = Ember.Component.extend({
    validationErrors: [],

    actions: {
        verifyTalkInput: function() {
            this.verifyInput();
        },

        doLogIn: function() {
            console.log('doLogIn Action');
            navigator.id.request();
        }
    },

    verifyInput: function() {
        this.set('validationErrors', []);
        if (!this.validateFieldContent(this.get('talk.title'), 10)) {
            this.get('validationErrors').pushObject('Your talk title must contain at least 10 characters!');
        }
        if (!this.validateFieldContent(this.get('talk.talkAbstract'), 50)) {
            this.get('validationErrors').pushObject('Your talk abstract must contain at least 50 characters!');
        }
        if (!this.validateFieldContent(this.get('talk.talkType'), 2)) {
            this.get('validationErrors').pushObject('Your talk type must contain at least 2 characters!');
        }
        if (!this.validateFieldContent(this.get('talk.topics'), 5)) {
            this.get('validationErrors').pushObject('Your talk topics must contain at least 5 characters!');
        }

        if (this.get('validationErrors').length === 0) {
            console.log('registering talk: ' + this.get('talk'));
            var talk = this.get('talk');
            talk.save().then(function(data) {
                alert('Thank you for updating your talk!');
            }, function(data) {
                alert('Unable to update your talk!');
            });
        }
    },

    validateFieldContent: function(fieldContent, length) {
        return (fieldContent && fieldContent.length >= length);
    }
});