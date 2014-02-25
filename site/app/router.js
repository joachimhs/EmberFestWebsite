Emberfest.Router = Ember.Router.extend({
    location: 'history'
});

Emberfest.Router.map(function() {
    this.route('index', {path: "/"});
    this.route('munich');
    this.route('partners');
    this.route('organizers');
    this.resource('talks', function() {
        this.route('talk', {path: "/:talk_id"});
    });
    this.resource('tickets', function() {
        this.route('purchased');
        this.route('cancelled');
    });
    this.route('venue');
    this.route('register');
    this.route('registerTalk');
    this.route('profile');
    this.resource('emberfestAdmin', function() {
        this.route('key', {path: '/key/:admin_key_id'});
    });
    this.route('mailinglist');
});