ECE.LoginAreaController = Ember.Controller.extend({
    needs: ['user'],

    doLogIn: function() {
        console.log('doLogIn Action');
        navigator.id.request();
    },

    doLogOut: function() {
        console.log('doLogOut Action');
        navigator.id.logout();
    },

    showLogin: function() {
        return !this.get('controllers.user.isLoggedIn');
    }.property('controllers.user.isLoggedIn'),

    showLogout: function() {
        return this.get('controllers.user.isLoggedIn');
    }.property('controllers.user.isLoggedIn')
});

Ember.TEMPLATES['loginArea'] = Ember.Handlebars.compile('' +
    '{{#if controllers.user.isLoggedIn}}' +
        '<div style="text-align: center; float: right;"><a href="#" class="persona-button" {{action "doLogOut"}}><span >Sign Out</span></a></div>' +
    '{{else}}' +
        '<div style="text-align: center; float: right;"><a href="#" class="persona-button" {{action doLogIn}}><span>Sign in with Mozilla Persona</span></a></div>' +
    '{{/if}}'
);