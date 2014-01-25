Emberfest.RegisterTalkRoute = Ember.Route.extend({
    model: function() {
        return Ember.Object.create();
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/registerTalk/"]);

        document.title = 'Register Talk - Ember Fest';
    }
});