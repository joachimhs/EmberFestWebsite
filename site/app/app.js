Ember.Handlebars.registerBoundHelper('markdown', function(property) {
    var converter = new Showdown.converter();
    if (property !== null) {
        return new Handlebars.SafeString(converter.makeHtml(property));
    }
});

Emberfest.LiviconView = Ember.View.extend({
    tagName: 'i',
    attributeBindings: ["data-name", "data-color", "data-size", "data-hovercolor", "data-op"],

    didInsertElement: function() {
        $("#" + this.get('elementId')).addLivicon();
    }
});

Emberfest.LiviconMorphView = Ember.View.extend({
    tagName: 'div',
    attributeBindings: ["data-name", "data-color", "data-size", "data-hovercolor", "data-op"],

    didInsertElement: function() {
        $("#" + this.get('elementId')).addLivicon();
    }
});

Emberfest.Store = DS.Store.extend({
    adapter:  "Emberfest.Adapter"
});

DS.RESTAdapter.reopen({
    namespace: 'json'
});

Emberfest.Adapter = DS.RESTAdapter.extend({
    defaultSerializer: "Emberfest/application"
});

Emberfest.ApplicationSerializer = DS.RESTSerializer.extend({});

Emberfest.RawTransform = DS.Transform.extend({
    deserialize: function(serialized) {
        return serialized;
    },
    serialize: function(deserialized) {
        return deserialized;
    }
});