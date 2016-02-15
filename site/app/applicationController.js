Emberfest.ApplicationController = Ember.Controller.extend({
    needs: ['user'],

    showingMenu: false,

    currentPathObserver: function() {
        this.set('showingMenu', false);
    }.observes('currentPath'),

    actions: {
        doLogIn: function() {
            console.log('doLogIn Action');
            navigator.id.request();
        },

        doLogOut: function() {
            console.log('doLogOut Action');
            navigator.id.logout();
        },

        toggleMenu: function() {
            console.log('action toggleMenu!');
            this.toggleProperty('showingMenu');
        }
    },

    isOnHome: function() {
        console.log('currentPath: ' + this.get('currentPath'));
        return this.get('currentPath') === 'index';
    }.property('currentPath'),

    menuObserver: function() {
        var showing = this.get('showingMenu');

        if (showing) {
            $("#burgerMenuButton").addClass("active");
            $("#header").addClass("active");
            $("#menu").hide().slideDown();
        } else {
            $("#menu").slideUp(function() {
                $("#burgerMenuButton").removeClass("active");
                $("#header").removeClass("active");
            });
        }
    }.observes('showingMenu')
});
