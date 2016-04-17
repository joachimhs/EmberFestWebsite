Emberfest.TicketsReceiptController = Ember.ObjectController.extend({
    needs: ['user'],

    init: function() {
        this._super();
        console.log('TICKETS RECEIPT CONTROLLER');
    },

    actions: {

    }
});