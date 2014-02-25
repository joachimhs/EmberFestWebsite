Emberfest.TicketsPurchasedController = Ember.ObjectController.extend({
    needs: ['user'],

    actions: {
        saveTicket: function(ticket) {
            ticket.save();
        },

        rollbackTicket: function(ticket) {
            ticket.rollback();
        }
    }
});