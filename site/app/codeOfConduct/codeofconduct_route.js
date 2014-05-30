Emberfest.CodeOfConductRoute = Ember.Route.extend(Emberfest.ResetScroll, {
    model: function() {
        return this.store.find('page', 'codeofconduct');
    }
});