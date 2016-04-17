import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveTicket: function(ticket) {
      ticket.save();
    },

    rollbackTicket: function(ticket) {
      ticket.rollbackAttributes();
    }
  }
});
