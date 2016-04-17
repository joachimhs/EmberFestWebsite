import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('material-design/md-textarea', 'Integration | Component | material design/md textarea', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{material-design/md-textarea}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#material-design/md-textarea}}
      template block text
    {{/material-design/md-textarea}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
