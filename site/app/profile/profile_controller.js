Emberfest.ProfileController = Ember.ObjectController.extend({
    needs: ['user'],

    actions: {
        doLogIn: function() {
            console.log('doLogIn Action');
            navigator.id.request();
        }
    }
});