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
    '<div id="loginButtonArea">' +
        '{{#if controllers.user.isLoggedIn}}' +
            '<button class="btn btn-primary" {{action "doLogOut"}}>Log Out</button>' +
       '{{else}}' +
            '<button class="btn btn-primary" {{action "doLogIn"}}>Log In / Register</button> ' +
        '{{/if}}' +
    '</div>'
);