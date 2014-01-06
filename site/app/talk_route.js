Emberfest.TalksTalkRoute = Ember.Route.extend({
    model: function(key) {
        console.log('!!!TalksTalkRoute model!!');
        console.log(key);
        return this.store.find('talk', key.talk_id)
    }
});