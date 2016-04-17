import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      page: this.store.find('page', 'ticketPurchase')
    });
  }
});
