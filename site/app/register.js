ECE.PagesRegisterRoute = Ember.Route.extend({
    model: function() {
        return Ember.Object.create();
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/register"]);
    }
});

ECE.PagesRegisterController = Ember.ObjectController.extend({
    needs: ['user'],

    waitingForUserToBeRegisterd: false,
    emailValidationError: null,
    firstNameValidationError: null,
    lastNameValidationError: null,
    homeCountryValidationError: null,

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
            ECE.User.updateRecord(user);
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

Ember.TEMPLATES['pages/register'] = Ember.Handlebars.compile('' +
    '<div class="markdownArea"><h1>Register a new Account!</h1>' +
    '<p>You have successfully logged in via Mozilla, persons, but we need some more information about you, in order to set up an account for you!</p>' +
    '<p>With your account, you will be able to answer the upcoming call for speakers, as well as comment on the call for speakers submissions. We use Mozilla Persona, which we think is a great online authentication system. Its great for us, because we do not need to know and keep your password. Mozilla Persona is safe and secure, and we are hoping it will become the identity system for the web!</p>' +
    '<p style="margin-bottom: 20px;">We still need to know who you are, in order to link your email address to your account details.</p>' +
    '<form class="form-horizontal">' +
        '<div class="control-group">' +
            '<label class="control-label" for="inputEmail">First Name</label>' +
            '<div class="controls">' +
                '{{view Ember.TextField valueBinding="firstName"}}' +
                '{{#if firstNameValidationError}}' +
                    '<span class="help-inline">{{firstNameValidationError}}</span>' +
                '{{/if}}' +
            '</div>' +
        '</div>' +
        '<div class="control-group">' +
            '<label class="control-label" for="inputEmail">Last Name</label>' +
            '<div class="controls">' +
                '{{view Ember.TextField valueBinding="lastName"}}' +
                '{{#if lastNameValidationError}}' +
                    '<span class="help-inline">{{lastNameValidationError}}</span>' +
                '{{/if}}' +
            '</div>' +
        '</div>' +
        '<div class="control-group">' +
            '<label class="control-label" for="inputEmail">Home Country</label>' +
            '<div class="controls">' +
                '{{view Ember.TextField valueBinding="homeCountry"}}' +
                '{{#if homeCountryValidationError}}' +
                    '<span class="help-inline">{{homeCountryValidationError}}</span>' +
                '{{/if}}' +
            '</div>' +
        '</div>' +
        '<div class="form-actions" style="background: none;">' +
            '<button type="submit" class="btn btn-primary" {{action "registerNewAccount"}}>Register New Account</button>' +
        '</div>' +
    '</form></div>'
);