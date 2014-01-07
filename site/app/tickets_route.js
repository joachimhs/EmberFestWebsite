Emberfest.TicketsRoute = Ember.Route.extend({
    model: function() {
        var tickets = [];

        tickets.pushObject(this.store.createRecord('ticketType', {
            id: "ebworkshop",
            name: "Early Bird Pre-Conference Workshop Ticket",
            ticketsAvailable: 5,
            price: 390,
            description: "This ticket is valid for the pre-conference workshop on August 26th and August 27th."
        }));

        tickets.pushObject(this.store.createRecord('ticketType', {
            id: "ebconf",
            name: "Early Bird Ember Fest Conference Ticket",
            ticketsAvailable: 5,
            price: 290,
            description: "This ticket is valid for the Ember Fest Conference on August 28th and August 29th."
        }));

        tickets.pushObject(this.store.createRecord('ticketType', {
            id: "ebworkshopconf",
            name: "Early Bird Pre-Conference Workshop and Ember Fest Conference Ticket",
            ticketsAvailable: 0,
            price: 640,
            description: "This ticket is valid for the pre-conference workshop on August 26th and August 27th and for the Ember Fest conference on August 28th and 29th."
        }));

        return tickets;
    }
});