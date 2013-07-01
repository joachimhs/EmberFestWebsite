Emberfest.ApplicationController = Ember.Controller.extend({
    logoUrl: '/images/logo_small_white.png',

    routeScheduler: null,
    routeToGoTo: null,

    scheduleRouteTransition: function(routeName) {
        var routeScheduler = this.get('routeScheduler');
        var controller = this;
        if (!routeScheduler) {
            console.log('[ROUTE SCHEDULER]: Creating Route Scheduler!');
            routeScheduler = setInterval(function() {
                controller.doTransitionToRoute();
            }, 50);
            this.set('routeScheduler', routeScheduler);
        }

        if ((new Date().getTime() - Emberfest.get('lastTransition')) > 450) {
            console.log('[ROUTE SCHEDULER]: scheduling destination route: ' + routeName);
            this.set('routeToGoTo', routeName);
        } else {
            console.log('[ROUTE SCHEDULER]: skip transition to: ' + routeName);
        }
    },

    doTransitionToRoute: function() {
        var routeToGoTo = this.get('routeToGoTo');


        if (routeToGoTo) {
            console.log('[ROUTE SCHEDULER]: transitioning to route: ' + routeToGoTo);
            this.transitionToRoute(routeToGoTo);
            this.set('routeToGoTo', null);
        } else {
            console.log('[ROUTE SCHEDULER]: No route to transition to');
        }
    }
});