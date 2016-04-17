import Model from 'ember-data/model';

export default Model.extend({
  title: DS.attr('string'),
  visible: DS.attr('boolean'),
  content: DS.attr('string')
});
