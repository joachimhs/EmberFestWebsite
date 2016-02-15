Emberfest.RolloverImageComponent = Ember.Component.extend({
    isMouseOver: false,
    classNameBindings: ['isMouseOver:active:inactive'],
    classNames: ['partner-image', 'animated'],

    mouseEnter: function(){
        this.set('isMouseOver', true);
    },

    mouseLeave: function() {
        this.set('isMouseOver', false);
    }
});