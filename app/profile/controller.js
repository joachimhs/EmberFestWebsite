import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    doLogIn: function() {
      console.log('doLogIn Action');
      navigator.id.request();
    }
  }
});
