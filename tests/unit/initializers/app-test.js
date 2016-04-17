import Ember from 'ember';
import AppInitializer from 'emberfest/initializers/app';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | app', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  AppInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
