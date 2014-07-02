Ember.Application.reopen({
    templates: [],

    init: function() {
        this._super();

        this.loadTemplates();
    },

    loadTemplates: function() {
        var app = this,
            templates = this.get('templates');

        app.deferReadiness();

        var promises = templates.map(function(name) {
            return Ember.$.get('/templates/'+name+'.hbs').then(function(data) {
                Ember.TEMPLATES[name] = Ember.Handlebars.compile(data);
            });
        });

        Ember.RSVP.all(promises).then(function() {
            app.advanceReadiness();
        });
    }
});


var Emberfest = Ember.Application.create({
    templates: ['application', 'index', '_tickets', 'organizers', '_schedule', '_sponsors', 'talk', 'talks', '_tickets', '_venue', "register", 'registerTalk', 'components/login-button'],
    rootElement: '#app'
});

Emberfest.Router = Ember.Router.extend({
    location: 'history'
});

Emberfest.Router.map(function() {
    this.resource('index', {path: "/"}, function() {
        this.route('tickets');
        this.resource('talks', function() {
            this.route('talk', {path: "/talk/:talk_id"});
        });
        this.route('schedule');
        this.route('venue');
        this.route('organizers');
        this.route('sponsors');
    });

    this.route("registerTalk");
    this.route('register');
});

Ember.Handlebars.registerBoundHelper('markdown', function(property) {
    var converter = new Showdown.converter();

    return new Handlebars.SafeString(converter.makeHtml(property));
});

