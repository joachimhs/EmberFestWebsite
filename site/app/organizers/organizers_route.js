Emberfest.OrganizersRoute = Ember.Route.extend(Emberfest.ResetScroll, {
    model: function() {
        return this.store.find('page', 'about');
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        console.log('INDEX');
        _gaq.push(['_trackPageview', "/organizers"]);

        document.title = 'About - Ember Fest!';
    }
});