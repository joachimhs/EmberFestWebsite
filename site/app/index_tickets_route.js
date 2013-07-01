Emberfest.IndexTicketsRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/tickets"]);

        document.title = 'Tickets - Ember Fest';
    },

    renderTemplate: function() {
        this._super();
        Emberfest.set('lastTransition', new Date().getTime());
        Ember.run.schedule('afterRender', this, function(){
            document.getElementById('tickets').scrollIntoView();
        });
    }
});