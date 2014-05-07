Emberfest.ApplicationController = Ember.Controller.extend({
    needs: ['user'],

    actions: {
        doLogIn: function() {
            console.log('doLogIn Action');
            navigator.id.request();
        },

        doLogOut: function() {
            console.log('doLogOut Action');
            navigator.id.logout();
        }
    },

    isOnHome: function() {
        console.log('currentPath: ' + this.get('currentPath'));
        return this.get('currentPath') === 'index';
    }.property('currentPath')
});
