Emberfest.TalksTalkRoute = Ember.Route.extend({
    model: function(id) {
        return Emberfest.Talk.find(id.talk_id);
    }
});