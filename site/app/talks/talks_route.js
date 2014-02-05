Emberfest.TalksIndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('talk');
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        console.log('INDEX');
        _gaq.push(['_trackPageview', "/talks"]);

        document.title = 'Talks - Ember Fest 2014!';
    }
});