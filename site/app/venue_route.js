Emberfest.IndexVenueRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/venue"]);

        document.title = 'Venue - Ember Fest';
    },

    renderTemplate: function() {
        this._super();
        Emberfest.set('lastTransition', new Date().getTime());
        Ember.run.schedule('afterRender', this, function(){
            document.getElementById('venue').scrollIntoView();
        });
    }
});