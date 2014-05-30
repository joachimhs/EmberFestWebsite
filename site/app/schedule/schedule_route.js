Emberfest.ScheduleRoute = Ember.Route.extend(Emberfest.ResetScroll, {
    model: function() {
        return this.store.find('scheduleDay');
    }
});