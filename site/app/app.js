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
    templates: ['application', 'index', 'munich'],
    rootElement: '#app'
});

Emberfest.Router = Ember.Router.extend({
    location: 'history'
});

Emberfest.Router.map(function() {
    this.route('munich');
});

Ember.Handlebars.registerBoundHelper('markdown', function(property) {
    var converter = new Showdown.converter();
    if (property != null) {
        return new Handlebars.SafeString(converter.makeHtml(property));
    }
});

