Emberfest.IndexController = Ember.ArrayController.extend({
    sortProperties: ['sortIndex'],
    sortAscending: true,

    currPhoto: 1,

    init: function() {
        this._super();

        var controller = this;

        (new Image()).src = '/uploads/budapest1.jpg';
        (new Image()).src = '/uploads/budapest2.jpg';
        (new Image()).src = '/uploads/budapest3.jpg';
        Ember.run.later(function() {
            controller.nextPhoto();
        }, 15000);
    },

    actions: {
        scrollDown: function() {
            $('html, body').animate({
                scrollTop: $("#mc_embed_signup").position().top
            }, 500);
        }
    },

    nextPhoto: function() {
        console.log('nextPhoto');
        var controller = this;

        var currPhoto = this.get('currPhoto');

        if (!currPhoto || currPhoto >= 3) {
            currPhoto = 1;
        } else {
            currPhoto++;
        }

        this.set('currPhoto', currPhoto);

        Ember.run.later(function() {
            controller.nextPhoto();
        }, 15000);
    },

    updateBackground: function() {
        console.log('currPhotoObserver');
        var currentPhoto = '/uploads/budapest' + this.get('currPhoto') + '.jpg';

        $('#topFestIntro').fadeOut(450, function() {
            $('#topFestIntro').css('background', 'url("' + currentPhoto + '") 0% 50% no-repeat').css('background-size', 'cover');
            $('#topFestIntro').fadeIn(450);
        });

        //component.set('shortDescription', component.currentPhotoDescription());
    }.observes('currPhoto').on('init')
});