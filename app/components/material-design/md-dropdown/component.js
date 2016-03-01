import Ember from 'ember';

const {get} = Ember;

export default Ember.Component.extend({
    tagName: 'ul',
    classNames: ['dropdown-content'],
    attributeBindings: ['id'],

    didInsertElement() {
        this._super(...arguments);
        this._setup();
    },

    _setup() {
        let ref = get(this, 'ref');
        let beloworigin = get(this, 'belowOrigin') ? true : false;
        let constrain = get(this, 'constrain') ? true : false;
        let alignment = get(this, 'alignment') ? 'right' : 'left';

        Ember.$("."+ref).dropdown({
            constrain_width: constrain,
            belowOrigin: beloworigin,
            alignment: alignment
        });
    }
});
