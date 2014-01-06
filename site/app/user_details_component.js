Emberfest.UserDetailsComponent = Ember.Component.extend({
    user: null,

    actions: {
        verifyAccountInput: function() {
            this.verifyInput();
        }
    },

    verifyInput: function() {
        console.log('this verify: ' + this.get('user.yearOfBirth'));
        this.set('validationErrors', []);
        if (!this.validateFieldContentString(this.get('user.fullName'), 5)) {
            this.get('validationErrors').pushObject('Your full name must contain at least 5 characters!');
        }
        if (!this.validateFieldContentString(this.get('user.company'), 2)) {
            this.get('validationErrors').pushObject('Your company name must contain at least 2 characters!');
        }
        if (!this.validateFieldContentString(this.get('user.phone'), 7)) {
            this.get('validationErrors').pushObject('Your phone number must contain at least 7 characters!');
        }
        if (!this.validateFieldContentString(this.get('user.countryOfResidence'), 3)) {
            this.get('validationErrors').pushObject('Your country of residence must contain at least 3 characters!');
        }
        if (!this.validateFieldNumber(this.get('user.yearOfBirth'), 1900)) {
            this.get('validationErrors').pushObject('Your year of birth must be after 1900! ' + this.get('user.yearOfBirth'));
        }

        if (this.get('validationErrors').length === 0) {
            console.log('Registering user');
            //this.get('controllers.user.model').save();
            console.log(this.get('user'));
            this.get('user').save();
            //Emberfest.User.updateRecord(this.get('user'));
        }
    },

    validateFieldContentString: function(fieldContent, length) {
        console.log('verifying: ' + fieldContent + " to be length: " + length);
        return (fieldContent != null && fieldContent.length >= length);
    },

    validateFieldNumber: function(fieldContent, length) {
        return (fieldContent != null && fieldContent >= length);
    }
});