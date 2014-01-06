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
    templates: ['application', 'index', 'munich', 'partners', 'organizers', 'talks', 'tickets', 'venue', 'register', 'registerTalk', 'talks/talk', 'talks/index', 'profile', 'components/user-details'],
    rootElement: '#app'
});

Emberfest.Router = Ember.Router.extend({
    location: 'history'
});

Emberfest.Router.map(function() {
    this.route('index', {path: "/"});
    this.route('munich');
    this.route('partners');
    this.route('organizers');
    this.resource('talks', function() {
        this.route('talk', {path: "/:talk_id"})
    });
    this.route('tickets');
    this.route('venue');
    this.route('register');
    this.route('registerTalk');
    this.route('profile');
});

Ember.Handlebars.registerBoundHelper('markdown', function(property) {
    var converter = new Showdown.converter();
    if (property != null) {
        return new Handlebars.SafeString(converter.makeHtml(property));
    }
});

Emberfest.LiviconView = Ember.View.extend({
    tagName: 'i',
    attributeBindings: ["data-name", "data-color", "data-size", "data-hovercolor", "data-op"],

    didInsertElement: function() {
        $("#" + this.get('elementId')).addLivicon();
    }
});

Emberfest.LiviconMorphView = Ember.View.extend({
    tagName: 'div',
    attributeBindings: ["data-name", "data-color", "data-size", "data-hovercolor", "data-op"],

    didInsertElement: function() {
        $("#" + this.get('elementId')).addLivicon();
    }
});

Emberfest.Store = DS.Store.extend({
    adapter:  "Emberfest.Adapter"
});

DS.RESTAdapter.reopen({
    namespace: 'json'
});

Emberfest.Adapter = DS.RESTAdapter.extend({
    defaultSerializer: "Emberfest/application"
});

Emberfest.ApplicationSerializer = DS.RESTSerializer.extend({});

Emberfest.RawTransform = DS.Transform.extend({
    deserialize: function(serialized) {
        return serialized;
    },
    serialize: function(deserialized) {
        return deserialized;
    }
});