Emberfest.TicketsIndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('ticketType');
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        console.log('INDEX');
        _gaq.push(['_trackPageview', "/tickets"]);

        document.title = 'Buy Tickets - Ember Fest!';

        controller.set('codeOfConduct', this.store.find('page', 'codeofconduct'));


    }
});