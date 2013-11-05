Emberfest.TicketsRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/tickets"]);

        document.title = 'Tickets - Ember Fest';
    }
});