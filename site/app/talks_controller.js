Emberfest.TalksController = Ember.ArrayController.extend({
    needs: ['application'],

    init: function() {
        this._super();
    },

    actions: {
        navigateToTalkSubmit: function() {
            this.get('controllers.application').scheduleRouteTransition('registerTalk');
        }
    }
});