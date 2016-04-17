import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  metrics: Ember.inject.service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('talks', function() {
    this.route('talk', {path: '/talk/:talk_id'});
    this.route('edit', {path: '/edit/:talk_id'});
  });
  this.route('tickets', function() {
    this.route('purchased');
    this.route('cancelled');
    this.route('receipt', {path: '/receipt/:order_id'});
  });
  this.route('venue');
  this.route('partners');
  this.route('previousYears');
  this.route('profile');
  this.route('registerTalk');
  this.route('codeOfConduct');
  this.route('register');
});

export default Router;
