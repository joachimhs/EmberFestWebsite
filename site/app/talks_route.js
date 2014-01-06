Emberfest.TalksIndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('talk');
    }
});