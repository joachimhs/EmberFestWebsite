Emberfest.TicketsCancelledController = Ember.ObjectController.extend({
    needs: ['user'],

    actions: {
        saveTicket: function(ticket) {
            ticket.save();
        },

        rollbackTicket: function(ticket) {
            ticket.rollback();
        },

        doLogIn: function() {
            console.log('doLogIn Action');
            navigator.id.request();
        },

        doLogOut: function() {
            console.log('doLogOut Action');
            navigator.id.logout();
        }
    }
});