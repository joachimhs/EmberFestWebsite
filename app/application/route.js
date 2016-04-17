import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      pages: this.store.findAll('page')
    });
  }
});
