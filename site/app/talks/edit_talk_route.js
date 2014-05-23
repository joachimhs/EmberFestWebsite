Emberfest.TalksEditRoute = Ember.Route.extend({
    model: function(talk) {
        return this.store.find("talk", talk.talk_id);
    }
});