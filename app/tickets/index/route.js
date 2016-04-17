import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      ticketPage: this.store.find('page', 'tickets'),
      ticketTypes: this.store.findAll('ticketType')
    });
  }
});
