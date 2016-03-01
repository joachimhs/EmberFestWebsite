import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'ul',
    classNames: ['tabs'],

    didInsertElement() {
        this._super(...arguments);
        this._setup();
    },

    _setup() {
        this.$().tabs();
    }
});
