Emberfest.IndexOrganizersRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/organizers"]);

        document.title = 'Organizers - Ember Fest';
    },

    renderTemplate: function() {
        this._super();
        Emberfest.set('lastTransition', new Date().getTime());
        Ember.run.schedule('afterRender', this, function(){
            document.getElementById('organizers').scrollIntoView();
        });
    }
});