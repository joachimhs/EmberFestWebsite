Emberfest.VenueRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('page', 'venue');
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        console.log('INDEX');
        _gaq.push(['_trackPageview', "/venue"]);

        document.title = 'Venue - Ember Fest!';
    }
});