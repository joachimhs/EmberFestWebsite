import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    scrollToMailinglist: function() {
      Ember.$('html, body').animate({
        scrollTop: $("#newsletter").offset().top
      }, 750);
    }
  }
});
