Emberfest.TalksTalkRoute = Ember.Route.extend(Emberfest.ResetScroll, {
    model: function(key) {
        console.log('!!!TalksTalkRoute model!!');
        console.log(key);
        return this.store.find('talk', key.talk_id);
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        console.log('INDEX');
        _gaq.push(['_trackPageview', "/talks/" + model.get('id')]);

        document.title = 'Talk ' + model.get('id') + " - Ember Fest!";
    }
});