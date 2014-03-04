Emberfest.PopOverComponent = Ember.Component.extend({
    tagName: 'span',

    popoverId: function() {
        return this.get('elementId') + "_popover";
    }.property('elementId')
});