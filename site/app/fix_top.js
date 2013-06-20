$(document).ready(function () {
    $(window).scroll(function () {
        var nav, spacer, scroll;

        if (!Emberfest.nav) {
            Emberfest.nav = $('#nav');
        }
        if (!Emberfest.spacer) {
            Emberfest.spacer = $('<div />', {
                'class': 'filter-drop-spacer',
                'height': Emberfest.nav.outerHeight()
            });
        }
        nav = Emberfest.nav;
        spacer = Emberfest.spacer;

        if (!nav.hasClass('fix-top') && $(window).scrollTop() > nav.offset().top) {
            nav.before(spacer);
            nav.addClass('fix-top');
        }
        else if (nav.hasClass('fix-top') && $(window).scrollTop() < spacer.offset().top) {
            nav.removeClass('fix-top');
            spacer.remove();
        }
    });
    window.emberFestInit = function () {
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
    };
});