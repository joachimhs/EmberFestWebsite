Emberfest.IndexRoute = Ember.Route.extend(Emberfest.ResetScroll, {
    model: function() {
        return this.store.find('acceptedTalk');
    },

    setupController: function(controller, model) {
        controller.set('page', controller.store.find('page', 'home'));

        this._super(controller, model);
        console.log('INDEX');
        _gaq.push(['_trackPageview', "/"]);

        document.title = 'Ember Fest 2016!';
    }
});