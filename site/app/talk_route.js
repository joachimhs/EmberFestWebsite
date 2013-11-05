Emberfest.TalksTalkRoute = Ember.Route.extend({
    model: function(talk) {
        return Emberfest.Talk.find(talk.talk_id);
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/talks/talk/" + model.get('id')]);

        document.title = 'Talk - ' + model.get('talkTitle') + ' - Ember Fest';
    }
});