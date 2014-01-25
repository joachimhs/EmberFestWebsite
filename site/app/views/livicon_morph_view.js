Emberfest.LiviconMorphView = Ember.View.extend({
    tagName: 'div',
    attributeBindings: ["data-name", "data-color", "data-size", "data-hovercolor", "data-op"],

    didInsertElement: function() {
        $("#" + this.get('elementId')).addLivicon();
    }
});