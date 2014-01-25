Ember.Handlebars.registerBoundHelper('markdown', function(property) {
    var converter = new Showdown.converter();
    if (property !== null) {
        return new Handlebars.SafeString(converter.makeHtml(property));
    }
});