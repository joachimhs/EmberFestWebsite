Emberfest.MunichRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('page', 'munich');
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        console.log('INDEX');
        _gaq.push(['_trackPageview', "/munich"]);

        document.title = 'Munich 2013 - Ember Fest!';
    }
});