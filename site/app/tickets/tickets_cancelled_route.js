Emberfest.TicketsCancelledRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('page', 'ticketCancelled');
    }
});