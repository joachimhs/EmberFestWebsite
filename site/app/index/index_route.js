Emberfest.IndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('acceptedTalk');
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        console.log('INDEX');
        _gaq.push(['_trackPageview', "/"]);

        document.title = 'Ember Fest 2014 - Barcelona!';
    }
});