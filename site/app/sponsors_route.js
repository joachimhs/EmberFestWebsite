Emberfest.SponsorsRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/sponsors"]);

        document.title = 'Sponsors - Ember Fest';
    }
});