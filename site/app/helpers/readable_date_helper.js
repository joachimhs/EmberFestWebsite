Ember.Handlebars.registerBoundHelper('readable-date', function(property) {
    if (property !== null) {
        return moment(property).format('MMMM Do YYYY');
    }
});

