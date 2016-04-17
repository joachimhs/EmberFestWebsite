import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'ul',
    classNames: ['collapsible'],

    didInsertElement() {
        this._super(...arguments);
        this._setup();
    },

    _setup() {
        const accordion = this.get('accordion');
        this.$().collapsible({ accordion });
    }
});
