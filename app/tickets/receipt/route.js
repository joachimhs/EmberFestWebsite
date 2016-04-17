import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      order: this.store.find('order', params.order_id)
    });
  }
});
