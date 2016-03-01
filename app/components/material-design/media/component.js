import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'img',
    classNames: ['materialboxed'],
    attributeBindings: [
        'src',
        'width'
    ],

    didInsertElement() {
        this._super(...arguments);
        this._setup();
    },

    _setup() {
        this.$().materialbox();
    }
});
