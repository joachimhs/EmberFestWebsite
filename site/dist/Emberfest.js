var Emberfest = Ember.Application.create({
    rootElement: '#app'
});


Emberfest.AdminRoute = Ember.Route.extend({
    model: function() {
        var data = [];

        data.pushObject(this.store.createRecord('adminData', {
            id: 'users'
        }));

        console.log('AdminRoute model');
        console.log(data[0]);

        data.pushObject(this.store.createRecord('adminData', {
            id: 'talks'
        }));

        data.pushObject(this.store.createRecord('adminData', {
            id: 'cookies'
        }));

        data.pushObject(this.store.createRecord('adminData', {
            id: 'tickets'
        }));

        return data;
    }
});
Ember.Handlebars.registerBoundHelper('markdown', function(property) {
    var converter = new Showdown.converter();
    if (property !== null) {
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
    },

    isOnHome: function() {
        console.log('currentPath: ' + this.get('currentPath'));
        return this.get('currentPath') === 'index';
    }.property('currentPath')
});

Emberfest.IndexIndexRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);
        console.log('INDEX');
        _gaq.push(['_trackPageview', "/"]);

        document.title = 'Welcome to Ember Fest!';
    }
});

Emberfest.IndexRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);
        console.log('INDEX');
        _gaq.push(['_trackPageview', "/"]);

        document.title = 'Welcome to Ember Fest!';
    }
});


Emberfest.MunichRoute = Ember.Route.extend({
    setupController: function(controller, model) {
        this._super(controller, model);
        console.log('MUNICH');
        _gaq.push(['_trackPageview', "/munich"]);

        document.title = 'Ember Fest 2013 - Munich!';
    }
});
Emberfest.Model = Ember.Object.extend();

Emberfest.Model.reopenClass({
    find: function(id, type) {
        console.log('find: ' + type + " id: " + id);
        var foundItem = this.contentArrayContains(id, type);

        if (!foundItem) {
            foundItem = type.create({ id: id, isLoaded: false});
            Ember.get(type, 'collection').pushObject(foundItem);
        }

        return foundItem;
    },

    contentArrayContains: function(id, type) {
        var contains = null;

        Ember.get(type, 'collection').forEach(function(item) {
            if (item.get('id') === id) {
                contains = item;
            }
        });

        return contains;
    },

    findAll: function(url, type, key) {
        console.log('findAll: ' + type + " " + url + " " + key);

        var collection = this;
        $.getJSON(url, function(data) {
            $.each(data[key], function(i, row) {
                var item = collection.contentArrayContains(row.id, type);
                if (!item) {
                    item =  type.create();
                    Ember.get(type, 'collection').pushObject(item);
                }
                item.setProperties(row);
                item.set('isLoaded', true);
                item.set('isError', false);
            });
        });

        return Ember.get(type, 'collection');
    },

    delete: function(url, type, id) {
        console.log('delete: ' + type + " " + id);
        var collection = this;
        $.ajax({
            type: 'DELETE',
            url: url + "/" + id,
            success: function(res, status, xhr) {
                if(res.deleted) {
                    var item = collection.contentArrayContains(id, type);
                    if (item) {
                        Ember.get(type, 'collection').removeObject(item);
                    }
                }
            },
            error: function(xhr, status, err) { alert('Unable to delete: ' + status + " :: " + err); }
        });
    },

    createRecord: function(url, type, model) {
        console.log('save: ' + type + " " + model.get('id'));
        var collection = this;
        model.set('isSaving', true);
        $.ajax({
            type: "PUT",
            url: url,
            data: JSON.stringify(model),
            success: function(res, status, xhr) {
                if (res.submitted) {
                    Ember.get(type, 'collection').pushObject(model);
                    model.set('isSaving', false);
                } else {
                    model.set('isError', true);
                }
            },
            error: function(xhr, status, err) { model.set('isError', false);  }
        });
    },

    updateRecord: function(url, type, model) {
        console.log('update: ' + type + " " + model.get('id'));
        var collection = this;
        model.set('isSaving', true);
        console.log(JSON.stringify(model));
        $.ajax({
            type: "PUT",
            url: url,
            data: JSON.stringify(model),
            success: function(res, status, xhr) {
                if (res.id) {
                    model.set('isSaving', false);
                    model.setProperties(res);
                } else {
                    model.set('isError', true);
                }
            },
            error: function(xhr, status, err) { model.set('isError', false);  }
        });
    }
});

/*Emberfest.Talk = Emberfest.Model.extend({

});

Emberfest.Talk.reopenClass({
    collection: Ember.A(),

    find: function(id) {
        return Emberfest.Model.find(id, Emberfest.Talk);
    },

    findAll: function() {
        return Emberfest.Model.findAll('/abstracts', Emberfest.Talk, 'abstracts');
    },

    createRecord: function(model) {
        Emberfest.Model.createRecord('/abstracts', Emberfest.Talk, model);
    },

    updateRecord: function(model) {
        Emberfest.Model.updateRecord("/abstracts", Emberfest.Talk, model);
    },

    delete: function(id) {
        Emberfest.Model.delete('/abstracts', Emberfest.Talk, id);
    }
});*/
Emberfest.AdminData = DS.Model.extend({

});
Emberfest.Talk = DS.Model.extend({
    title: DS.attr('string'),
    talkAbstract: DS.attr('string'),
    talkType: DS.attr('string'),
    topics: DS.attr('string'),
    outline: DS.attr('string'),
    participantRequirements: DS.attr('string'),
    comments: DS.attr('string'),
    talkSuggestedBy: DS.attr('string'),
    talkBy: DS.attr('string')
});
Emberfest.User = DS.Model.extend({
    userId: DS.attr('string'),
    fullName: DS.attr('string'),
    company: DS.attr('string'),
    phone: DS.attr('string'),
    dietaryRequirements: DS.attr('string'),
    attendingDinner: DS.attr('boolean'),
    countryOfResidence: DS.attr('string'),
    yearOfBirth: DS.attr('number'),
    authLevel: DS.attr('string'),
    talks: DS.hasMany('talk', { async: true })
});


/*Emberfest.User = Emberfest.Model.extend({
 ownsTalk: function (talkId) {
 var hasTalk = false;
 var userTalks = this.get('talks');
 userTalks.forEach(function (talk) {
 if (talk === talkdId) {
 hasTalk = true;
 }
 });

 return hasTalk;
 }
 });

 Emberfest.User.reopenClass({
 collection: Ember.A(),

 find: function (id) {
 return Emberfest.Model.find(id, Emberfest.User);
 },

 findAll: function () {
 return Emberfest.Model.findAll('/user', Emberfest.User, "users");
 },

 createRecord: function (model) {
 Emberfest.Model.createRecord('/user', Emberfest.User, model);
 },

 updateRecord: function (model) {
 Emberfest.Model.updateRecord("/user", Emberfest.User, model);
 },

 delete: function (id) {
 Emberfest.Model.delete('/user', Emberfest.User, id);
 }
 });*/
Emberfest.ProfileController = Ember.ObjectController.extend({
    needs: ['user'],

    actions: {
        doLogIn: function() {
            console.log('doLogIn Action');
            navigator.id.request();
        }
    }
});
Emberfest.ProfileRoute = Ember.Route.extend({
    model: function() {
        var uuidToken = this.controllerFor('user').readCookie('uuidToken');
        console.log('ProfileRoute uuidToken: ' + uuidToken);

        if (uuidToken) {
            return this.store.find('user', uuidToken);
        }
    }
});
Emberfest.RegisterController = Ember.Controller.extend({
    needs: ['user'],

    fullNameBinding: 'controllers.user.fullName',
    companyBinding: 'controllers.user.company',
    phoneBinding: 'controllers.user.phone',
    dietaryRequirementsBinding: 'controllers.user.dietaryRequirements',
    countryOfResidenceBinding: 'controllers.user.countryOfResidence',
    yearOfBirthBinding: 'controllers.user.yearOfBirth',
    attendingDinnerBinding: 'controllers.user.attendingDinner',
    validationErrors: [],

    actions: {
        verifyAccountInput: function() {
            this.verifyInput();
        },

        doLogIn: function() {
            navigator.id.request();
        }
    },

    verifyInput: function() {
        this.set('validationErrors', []);
        if (!this.validateFieldContent(this.get('fullName'), 5)) {
            this.get('validationErrors').pushObject('Your full name must contain at least 5 characters!');
        }
        if (!this.validateFieldContent(this.get('company'), 2)) {
            this.get('validationErrors').pushObject('Your company name must contain at least 2 characters!');
        }
        if (!this.validateFieldContent(this.get('phone'), 7)) {
            this.get('validationErrors').pushObject('Your phone number must contain at least 7 characters!');
        }
        if (!this.validateFieldContent(this.get('countryOfResidence'), 3)) {
            this.get('validationErrors').pushObject('Your country of residence must contain at least 3 characters!');
        }
        if (!this.validateFieldContent(this.get('yearOfBirth'), 4)) {
            this.get('validationErrors').pushObject('Your year of birth must contain at least 4 characters!');
        }

        if (this.get('validationErrors').length === 0) {
            console.log('Registering user');
            this.get('controllers.user.model').save();
            //Emberfest.User.updateRecord(this.get('controllers.user.model'));
        }
    },

    validateFieldContent: function(fieldContent, length) {
        return (fieldContent !== null && fieldContent.length >= length);
    }
});
Emberfest.RegisterTalkController = Ember.Controller.extend({
    needs: ['user'],

    actions: {
        verifyTalkInput: function() {
            this.verifyInput();
        },

        doLogIn: function() {
            console.log('doLogIn Action');
            navigator.id.request();
        }
    },
    validationErrors: [],


    verifyInput: function() {
        this.set('validationErrors', []);
        if (!this.validateFieldContent(this.get('title'), 10)) {
            this.get('validationErrors').pushObject('Your talk title must contain at least 10 characters!');
        }
        if (!this.validateFieldContent(this.get('talkAbstract'), 50)) {
            this.get('validationErrors').pushObject('Your talk abstract must contain at least 50 characters!');
        }
        if (!this.validateFieldContent(this.get('talkType'), 2)) {
            this.get('validationErrors').pushObject('Your talk type must contain at least 2 characters!');
        }
        if (!this.validateFieldContent(this.get('topics'), 5)) {
            this.get('validationErrors').pushObject('Your talk topics must contain at least 5 characters!');
        }

        if (this.get('validationErrors').length === 0) {
            console.log('registering talk');
            var talkId = Math.uuid(16, 16);
            var talk = this.store.createRecord('talk', {
                id: talkId,
                title: this.get('title'),
                talkAbstract: this.get('talkAbstract'),
                talkType: this.get('talkType'),
                topics: this.get('topics'),
                outline: this.get('outline'),
                participantRequirements: this.get('participantRequirements'),
                comments: this.get('comments')
            });

            talk.save();

            this.transitionToRoute('talks');
        }
    },

    validateFieldContent: function(fieldContent, length) {
        return (fieldContent !== null && fieldContent.length >= length);
    }
});
Emberfest.RegisterTalkRoute = Ember.Route.extend({
    model: function() {
        return Ember.Object.create();
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/registerTalk/"]);

        document.title = 'Register Talk - Ember Fest';
    }
});
Emberfest.RegisterTextfield = Ember.TextField.extend({
    focusOut: function() {
        console.log(this.get('controller'));
        this.get('controller').verifyInput();
    }
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
        this.route('talk', {path: "/:talk_id"});
    });
    this.route('tickets');
    this.route('venue');
    this.route('register');
    this.route('registerTalk');
    this.route('profile');
    this.resource('admin', function() {
        this.resource('adminData', {path: '/data/:data_id'}, function() {

        });
    });
});
Emberfest.TalksTalkRoute = Ember.Route.extend({
    model: function(key) {
        console.log('!!!TalksTalkRoute model!!');
        console.log(key);
        return this.store.find('talk', key.talk_id);
    }
});
Emberfest.TalksIndexController = Ember.ArrayController.extend({
    needs: ['user'],

    actions: {
        doLogIn: function() {
            console.log('doLogIn Action');
            navigator.id.request();
        }
    }
});
Emberfest.TalksIndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('talk');
    }
});
Emberfest.TicketType = DS.Model.extend({
    name: DS.attr('string'),
    ticketsAvailable: DS.attr('number'),
    price: DS.attr('number'),
    description: DS.attr('string')
});
/**
 * Created by jhsmbp on 1/7/14.
 */

Emberfest.TicketsRoute = Ember.Route.extend({
    model: function() {
        var tickets = [];

        tickets.pushObject(this.store.createRecord('ticketType', {
            id: "ebworkshop",
            name: "Early Bird Pre-Conference Workshop Ticket",
            ticketsAvailable: 5,
            price: 390,
            description: "This ticket is valid for the pre-conference workshop on August 26th and August 27th."
        }));

        tickets.pushObject(this.store.createRecord('ticketType', {
            id: "ebconf",
            name: "Early Bird Ember Fest Conference Ticket",
            ticketsAvailable: 5,
            price: 290,
            description: "This ticket is valid for the Ember Fest Conference on August 28th and August 29th."
        }));

        tickets.pushObject(this.store.createRecord('ticketType', {
            id: "ebworkshopconf",
            name: "Early Bird Pre-Conference Workshop and Ember Fest Conference Ticket",
            ticketsAvailable: 0,
            price: 640,
            description: "This ticket is valid for the pre-conference workshop on August 26th and August 27th and for the Ember Fest conference on August 28th and 29th."
        }));

        return tickets;
    }
});
Emberfest.UserController = Ember.ObjectController.extend({
    init: function() {
        this._super();

        console.log('UserController init');
        var controller = this;
        // Mozilla Persona
        navigator.id.watch({
            loggedInUser: null,
            onlogin: function(assertion) {
                $.ajax({
                    type: 'POST',
                    url: '/auth/login',
                    data: {assertion: assertion},
                    success: function(res, status, xhr) {
                        if (res.uuidToken) {
                            console.log('setting uuidToken: ' + res.uuidToken);
                            controller.createCookie("uuidToken", res.uuidToken, 1);
                            controller.store.find('user', res.uuidToken).then(function(user) { controller.set('model', user); });
                        }
                    },
                    error: function(xhr, status, err) {  }
                });
            },

            onlogout: function() {
                $.ajax({
                    type: 'POST',
                    url: '/auth/logout',
                    success: function(xhr, status, err) {
                        console.log('onlogout: ');
                        console.log(xhr);
                        controller.set('content.id', null);
                        controller.set('content.authLevel', null);
                        controller.eraseCookie("uuidToken");
                    },
                    error: function(xhr, status, err) { console.log("error: " + status + " error: " + err); }
                });
            }
        });
    },

    createCookie:function (name, value, days) {
        var expires = "";

        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        else expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    },

    readCookie:function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    eraseCookie:function (name) {
        this.createCookie(name, "", -1);
    },

    isLoggedIn: function() {
        return this.get('id') !== null && (this.get('authLevel') === 'user' || this.get('authLevel') === 'admin' || this.get('authLevel') === 'root');
    }.property('id', 'authLevel'),

    showRegistrationForm: function() {
        console.log('showRegistretionFormObserver: ' + this.get('id') + " authLevel: " + this.get('authLevel'));
        if (this.get('id') !== null && this.get('authLevel') === 'not_registered') {
            console.log('transitioning to pages.register');
            this.transitionToRoute('register');
        }
    }.observes('uuidToken', 'authLevel'),

    contentObserver: function() {
        console.log('user model updated: ');
        console.log(this.get('model'));
    }.observes('model')
});
Emberfest.UserDetailsComponent = Ember.Component.extend({
    user: null,

    actions: {
        verifyAccountInput: function() {
            this.verifyInput();
        }
    },

    verifyInput: function() {
        console.log('this verify: ' + this.get('user.yearOfBirth'));
        this.set('validationErrors', []);
        if (!this.validateFieldContentString(this.get('user.fullName'), 5)) {
            this.get('validationErrors').pushObject('Your full name must contain at least 5 characters!');
        }
        if (!this.validateFieldContentString(this.get('user.company'), 2)) {
            this.get('validationErrors').pushObject('Your company name must contain at least 2 characters!');
        }
        if (!this.validateFieldContentString(this.get('user.phone'), 7)) {
            this.get('validationErrors').pushObject('Your phone number must contain at least 7 characters!');
        }
        if (!this.validateFieldContentString(this.get('user.countryOfResidence'), 3)) {
            this.get('validationErrors').pushObject('Your country of residence must contain at least 3 characters!');
        }
        if (!this.validateFieldNumber(this.get('user.yearOfBirth'), 1900)) {
            this.get('validationErrors').pushObject('Your year of birth must be after 1900! ' + this.get('user.yearOfBirth'));
        }

        if (this.get('validationErrors').length === 0) {
            console.log('Registering user');
            //this.get('controllers.user.model').save();
            console.log(this.get('user'));
            this.get('user').save();
            //Emberfest.User.updateRecord(this.get('user'));
        }
    },

    validateFieldContentString: function(fieldContent, length) {
        console.log('verifying: ' + fieldContent + " to be length: " + length);
        return (fieldContent !== null && fieldContent.length >= length);
    },

    validateFieldNumber: function(fieldContent, length) {
        return (fieldContent !== null && fieldContent >= length);
    }
});