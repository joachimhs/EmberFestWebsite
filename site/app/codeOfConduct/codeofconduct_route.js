Emberfest.CodeOfConductRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('page', 'codeofconduct');
    }
});