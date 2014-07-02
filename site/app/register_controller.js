Emberfest.RegisterController = Ember.Controller.extend({
    needs: ['user'],

    waitingForUserToBeRegisterd: false,
    emailValidationError: null,
    firstNameValidationError: null,
    lastNameValidationError: null,
    homeCountryValidationError: null,

    actions: {
        registerNewAccount: function() {
            var validated = true;
            if (!this.validateFieldContent(this.get('firstName'))) {
                this.set('firstNameValidationError', 'First Name must contain at least 3 characters!');
                validated = false;
            } else {
                this.set('firstNameValidationError', null);
            }

            if (!this.validateFieldContent(this.get('lastName'))) {
                this.set('lastNameValidationError', 'Last Name must contain at least 3 characters!');
                validated = false;
            } else {
                this.set('lastNameValidationError', null);
            }

            if (!this.validateFieldContent(this.get('homeCountry'))) {
                this.set('homeCountryValidationError', 'Home Country must contain at least 3 characters!');
                validated = false;
            } else {
                this.set('homeCountryValidationError', null);
            }

            if (validated) {
                var controller = this;
                var user = this.get('controllers.user.content');
                user.set('firstName', this.get('firstName'));
                user.set('lastName', this.get('lastName'));
                user.set('homeCountry', this.get('homeCountry'));
                this.set('waitingForUserToBeRegisterd', true);
                Emberfest.User.updateRecord(user);
            }
        }
    },

    authLevelObserver: function() {
        var authLevel = this.get('controllers.user.content.authLevel');
        console.log('authLevelObserver:' + this.get('waitingForUserToBeRegisterd') + " " + authLevel);
        if (this.get('waitingForUserToBeRegisterd') && (authLevel === 'user' || authLevel === 'admin' || authLevel === 'root')) {
            this.set('waitingForUserToBeRegisterd', false);
            alert('Congratulations, your user details were updated successfully!');
            this.transitionToRoute('pages');
        }
    }.observes('controllers.user.content.authLevel'),

    validateEmail: function() {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.get('email'));
    },

    validateFieldContent: function(fieldContent) {
        return (fieldContent != null && fieldContent.length > 2);
    }
});