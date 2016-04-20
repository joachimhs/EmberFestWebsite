import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super();
    Ember.run.schedule('afterRender', function() {
      Materialize.updateTextFields();
    });
  }
});
