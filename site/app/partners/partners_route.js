Emberfest.PartnersRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('page', 'partners');
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        console.log('INDEX');
        _gaq.push(['_trackPageview', "/partners"]);

        document.title = 'Partners - Ember Fest!';
    }
});