Emberfest.RegisterController = Ember.Controller.extend({
    needs: ['user'],

    fullNameBinding: 'controllers.user.fullName',
    companyBinding: 'controllers.user.company',
    phoneBinding: 'controllers.user.phone',
    dietaryRequirementsBinding: 'controllers.user.dietaryRequirements',
    countryOfResidenceBinding: 'controllers.user.countryOfResidence',
    yearOfBirthBinding: 'controllers.user.yearOfBirth',
    attendingDinnerBinding: 'controllers.user.attendingDinner',
    validationErrors: [],

    actions: {
        verifyAccountInput: function() {
            this.verifyInput();
        },

        doLogIn: function() {
            navigator.id.request();
        }
    },

    verifyInput: function() {
        this.set('validationErrors', []);
        if (!this.validateFieldContent(this.get('fullName'), 5)) {
            this.get('validationErrors').pushObject('Your full name must contain at least 5 characters!');
        }
        if (!this.validateFieldContent(this.get('company'), 2)) {
            this.get('validationErrors').pushObject('Your company name must contain at least 2 characters!');
        }
        if (!this.validateFieldContent(this.get('phone'), 7)) {
            this.get('validationErrors').pushObject('Your phone number must contain at least 7 characters!');
        }
        if (!this.validateFieldContent(this.get('countryOfResidence'), 3)) {
            this.get('validationErrors').pushObject('Your country of residence must contain at least 3 characters!');
        }
        if (!this.validateFieldContent(this.get('yearOfBirth'), 4)) {
            this.get('validationErrors').pushObject('Your year of birth must contain at least 4 characters!');
        }

        if (this.get('validationErrors').length === 0) {
            console.log('Registering user');
            this.get('controllers.user.model').save();
            //Emberfest.User.updateRecord(this.get('controllers.user.model'));
        }
    },

    validateFieldContent: function(fieldContent, length) {
        return (fieldContent != null && fieldContent.length >= length);
    }
});