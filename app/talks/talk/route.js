import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      talk: this.store.find('talk', params.talk_id)
    });
  }
});
