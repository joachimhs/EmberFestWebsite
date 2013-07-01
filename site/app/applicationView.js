Emberfest.ApplicationView = Ember.View.extend({
    didInsertElement: function () {
        emberFestInit();
        var view = this;
        $('#home').waypoint(function (direction) {
            //view.get('controller').transitionToRoute('index');
            view.get('controller').scheduleRouteTransition('index');
            $('.index-a a').addClass('active');
        }, { offset: -150 });
        $('#tickets').waypoint(function (direction) {
            //view.get('controller').transitionToRoute('index.tickets');
            view.get('controller').scheduleRouteTransition('index.tickets');
            if (direction === 'down') {
                $('.tickets-a a').addClass('active');
                $('.index-a a').removeClass('active');
            } else {
                $('.tickets-a a').removeClass('active');
                $('.index-a a').addClass('active');
            }
        }, { offset: 150 });
        $('#talks').waypoint(function (direction) {
            //view.get('controller').transitionToRoute('index.talks');
            view.get('controller').scheduleRouteTransition('index.talks');
            if (direction === 'down') {
                $('.talks-a a').addClass('active');
                $('.tickets-a a').removeClass('active');
            } else {
                $('.talks-a a').removeClass('active');
                $('.tickets-a a').addClass('active');
            }
        }, { offset: 150 });
        $('#schedule').waypoint(function (direction) {
            //view.get('controller').transitionToRoute('index.schedule');
            view.get('controller').scheduleRouteTransition('index.schedule');
            if (direction === 'down') {
                $('.schedule-a a').addClass('active');
                $('.talks-a a').removeClass('active');
            } else {
                $('.schedule-a a').removeClass('active');
                $('.talks-a a').addClass ('active');
            }
        }, { offset: 150 });
        $('#venue').waypoint(function (direction) {
            //view.get('controller').transitionToRoute('index.venue');
            view.get('controller').scheduleRouteTransition('index.venue');
            if (direction === 'down') {
                $('.venue-a a').addClass('active');
                $('.schedule-a a').removeClass('active');
            } else {
                $('.venue-a a').removeClass('active');
                $('.schedule-a a').addClass('active');
            }
        }, { offset: 150 });
        $('#organizers').waypoint(function (direction) {
            //view.get('controller').transitionToRoute('index.organizers');
            view.get('controller').scheduleRouteTransition('index.organizers');
            if (direction === 'down') {
                $('.organizers-a a').addClass('active');
                $('.venue-a a').removeClass('active');
            } else {
                $('.organizers-a a').removeClass('active');
                $('.venue-a a').addClass('active');
            }
        }, { offset: 150 });
        $('#sponsors').waypoint(function (direction) {
            //view.get('controller').transitionToRoute('index.sponsors');
            console.log(view.get('controller'));
            view.get('controller').scheduleRouteTransition('index.sponsors');
            if (direction === 'down') {
                $('.sponsors-a a').addClass('active');
                $('.organizers-a a').removeClass('active');
            } else {
                $('.sponsors-a a').removeClass('active');
                $('.organizers-a a').addClass('active');
            }
        }, { offset: 150 });
    }
});