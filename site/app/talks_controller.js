Emberfest.TalksIndexController = Ember.ArrayController.extend({
    needs: ['user'],

    actions: {
        doLogIn: function() {
            console.log('doLogIn Action');
            navigator.id.request();
        }
    }
});