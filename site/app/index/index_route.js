Emberfest.IndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('page', 'home')
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        console.log('INDEX');
        _gaq.push(['_trackPageview', "/"]);

        document.title = 'Welcome to Ember Fest!';
    }
});


Emberfest.MunichRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);
        console.log('MUNICH');
        _gaq.push(['_trackPageview', "/munich"]);

        document.title = 'Ember Fest 2013 - Munich!';
    }
});