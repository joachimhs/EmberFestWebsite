import Ember from 'ember';

export default Ember.Component.extend({
  //$('input#input_text, textarea#textarea1').characterCounter();

  init: function() {
    this._super();
    Ember.run.schedule('afterRender', function() {
      $('textarea.materialize-textarea').trigger('autoresize');
    });
  }
});
