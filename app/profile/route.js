import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var uuidToken = this.session.readCookie('uuidToken');
    console.log('ProfileRoute uuidToken: ' + uuidToken);

    if (uuidToken) {
      return Ember.RSVP.hash({
        user: this.store.find('user', uuidToken)
      });
    }
  }
});
