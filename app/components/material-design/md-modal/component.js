import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'div',
    classNames: ['modal'],
    attributeBindings: [
        'id',
        'style'
    ],

    didInsertElement() {
        this._super(...arguments);
        this._setup();
    },

    close(){
        this.$().closeModal();
    },

    open(){
        this.$().openModal();
    },

    _setup() {
        Ember.$('.md-modal-trigger').leanModal();
    },

    actions: {
        close(){
            this.close();
        },

        open(){
            this.open();
        },
    }
});
