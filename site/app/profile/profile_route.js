Emberfest.ProfileRoute = Ember.Route.extend(Emberfest.ResetScroll, {
    model: function() {
        var uuidToken = this.controllerFor('user').readCookie('uuidToken');
        console.log('ProfileRoute uuidToken: ' + uuidToken);

        if (uuidToken) {
            return this.store.find('user', uuidToken);
        }
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        console.log('INDEX');
        _gaq.push(['_trackPageview', "/profile"]);

        document.title = 'Profile - Ember Fest 2014!';
    }
});