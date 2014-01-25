Emberfest.LiviconView = Ember.View.extend({
    tagName: 'i',
    attributeBindings: ["data-name", "data-color", "data-size", "data-hovercolor", "data-op"],

    didInsertElement: function() {
        $("#" + this.get('elementId')).addLivicon();
    }
});