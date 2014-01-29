Emberfest.TicketsRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('ticketType');
    }
});