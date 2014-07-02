Emberfest.IndexSponsorsRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/sponsors"]);

        document.title = 'Sponsors - Ember Fest';
    },

    renderTemplate: function() {
        this._super();
        Emberfest.set('lastTransition', new Date().getTime());
        console.log('Sponsors renderTemplate: ' + Emberfest.get('lastTransition'));
        Ember.run.schedule('afterRender', this, function(){
            document.getElementById('sponsors').scrollIntoView();
        });
    }
});