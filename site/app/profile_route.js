Emberfest.ProfileRoute = Ember.Route.extend({
    model: function() {
        var uuidToken = this.controllerFor('user').readCookie('uuidToken');
        console.log('ProfileRoute uuidToken: ' + uuidToken);

        if (uuidToken) {
            return this.store.find('user', uuidToken);
        }
    }
});