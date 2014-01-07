Emberfest.ApplicationController = Ember.Controller.extend({
    needs: ['user'],

    actions: {
        doLogIn: function() {
            console.log('doLogIn Action');
            navigator.id.request();
        },

        doLogOut: function() {
            console.log('doLogOut Action');
            navigator.id.logout();
        }
    },

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
        }
    },

    doTransitionToRoute: function() {
        var routeToGoTo = this.get('routeToGoTo');


        if (routeToGoTo) {
            console.log('[ROUTE SCHEDULER]: transitioning to route: ' + routeToGoTo);
            this.transitionToRoute(routeToGoTo);
            this.set('routeToGoTo', null);
        }
    }
});
