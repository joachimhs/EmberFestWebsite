import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  attributeBindings: ['type', 'id', 'name'],
  type: 'file',

  inputId: function() {
    return this.get('elementId') + "_fileupload"
  }.property('elementId'),

  didInsertElement: function() {
    console.log('file-upload didInsertElement: ' + this.get('elementId'));

    var view = this;
    Ember.run.schedule("afterRender", function() {

      Ember.$('#' + view.get('inputId')).fileupload({
        url: '/json/uploadPhoto/',
        dataType: 'json',
        done: function (e, data) {
          console.log('done');
          console.log(data);
          console.log(data.result.filename);

          view.sendAction('uploadCompleted', data.result.filename);
        },
        progressall: function (e, data) {
          console.log('progressall');
          console.log(data);
          /*var progress = parseInt(data.loaded / data.total * 100, 10);
           $('#progress .progress-bar').css(
           'width',
           progress + '%'
           );*/
        },
        change: function (e, data) {
          console.log('change');
          console.log(e);
          console.log(data);
        }
      }).prop('disabled', !Ember.$.support.fileInput)
        .parent().addClass(Ember.$.support.fileInput ? undefined : 'disabled');
    });
  }
});
