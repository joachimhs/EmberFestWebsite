Emberfest.TalksEditRoute = Ember.Route.extend(Emberfest.ResetScroll, {
    model: function(talk) {
        return this.store.find("talk", talk.talk_id);
    }
});