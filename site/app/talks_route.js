Emberfest.TalksRoute = Ember.Route.extend( {
    model: function() {
        return Emberfest.Talk.findAll()
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/talks"]);

        document.title = 'Talks - Ember Fest';
    }
});