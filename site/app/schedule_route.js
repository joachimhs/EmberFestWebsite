Emberfest.ScheduleRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/schedule"]);

        document.title = 'Schedule - Ember Fest';
    }
});