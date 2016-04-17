import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'a',
    classNames: ['button-collapse'],
    attributeBindings:["data-activates"],
    didInsertElement() {
        this._super(...arguments);
        this._setup();
    },

    _setup() {
        this.$().sideNav();
    }
});
