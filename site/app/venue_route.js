Emberfest.VenueRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/venue"]);

        document.title = 'Venue - Ember Fest';
    },

    renderTemplate: function() {
        this._super();
        Ember.run.schedule('afterRender', this, function(){
            var emberfest = new google.maps.LatLng(48.130888,11.581521),
                mapOptions = {
                    center: emberfest,
                    zoom: 16,
                    scrollwheel: false,
                    navigationControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    draggable: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                },
                map = new google.maps.Map(document.getElementById('venue-map'), mapOptions),
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(48.131296,11.589375),
                    map: map,
                    title: 'EmberFest 2013',
                    image: '/images/logo_small.png'
                });
        });
    }
});