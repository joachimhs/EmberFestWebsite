import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    doLogIn: function() {
      console.log('doLogIn Action');
      navigator.id.request();
    },

    doLogOut: function() {
      console.log('doLogOut Action');
      navigator.id.logout();
    },
  }
});
