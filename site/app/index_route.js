Emberfest.IndexIndexRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/"]);

        document.title = 'Welcome to Ember Fest!';
    }
});