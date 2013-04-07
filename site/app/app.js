// Mozilla Persona
navigator.id.watch({
    loggedInUser: null,
    onlogin: function(assertion) {
        $.ajax({
            type: 'POST',
            url: '/auth/login',
            data: {assertion: assertion},
            success: function(res, status, xhr) {
                if (res.authFailed) {
                    alert('Authentication Failed');
                } else if (res.uuidToken) {
                    ECE.set('uuidToken', res.uuidToken);
                    document.cookie="uuidToken=" + res.uuidToken;
                    ECE.router.send("loginSuccessful");
                }
            },
            error: function(xhr, status, err) { ECE.router.send("doLogOut"); }
        });
    },

    onlogout: function() {
        $.ajax({
            type: 'POST',
            url: '/auth/logout',
            success: function(res, status, xhr) { console.log('onlogout: '); console.log(res); },
            error: function(xhr, status, err) { ECE.router.send("doLogOut"); }
        });
    }
});

var ECE = Ember.Application.create({
});

ECE.Router = Ember.Router.extend({
    location: 'history'
});

ECE.Router.map(function() {
    this.resource("pages", {path: "/"}, function() {
        this.route("page", {path: "/pages/:page_id"});
    });
});

ECE.IndexRoute = Ember.Route.extend({
    model: function() {
        return ECE.Page.findAll();
    }
});

ECE.HeaderController = Ember.ArrayController.extend({
    needs: ['pages']
});

ECE.ApplicationController = Ember.Controller.extend({
    doLogIn: function() {
        console.log('doLogIn Action');
        navigator.id.request();
    }
});

ECE.PagesIndexRoute = Ember.Route.extend({
    setupController: function(controller) {
        this._super(controller);
        controller.parseMarkdown();
        _gaq.push(['_trackPageview', "/"]);
    }
});

ECE.PagesIndexController = Ember.ArrayController.extend({
    needs: ['pages'],

    parseMarkdown: function() {
        var controller = this;
        if (!this.markdown && this.get('controllers.pages.content.length') > 0) {
            var page = this.get('controllers.pages.arrangedContent.firstObject.pageFilename');
            if (page) {
                $.get('/mrkdwn/' + page, function(data) {
                    controller.set('markdown', new Handlebars.SafeString(new Showdown.converter().makeHtml(data)));
                });
            }
        }
    },

    contentObserver: function() {
        this.parseMarkdown();
    }.observes('controllers.pages.content.length')
});

Ember.TEMPLATES['application'] = Ember.Handlebars.compile('' +
    '<div id="toolbarArea">' +
        '<button class="btn btn-primary" {{action "doLogIn"}}>Log In</button>' +
    '</div>' +
    '<div id="mainArea">' +
        '<div id="header">' +
            '<div id="headerLogo">{{#linkTo "pages"}}<img src="/img/ece_logo.png">{{/linkTo}}</div> ' +
            '<div id="headerLinks">{{render header}}</div>' +
        '</div>' +
        '<div id="contentArea">{{outlet}}</div>' +
    '</div>'
);

Ember.TEMPLATES['header'] = Ember.Handlebars.compile('' +
    '| ' +
    '{{#each controllers.pages.arrangedContent}}' +
        '{{#linkTo "pages.page" this}}{{pageName}}{{/linkTo}} | ' +
    '{{/each}}'
);

Ember.TEMPLATES['pages/index'] = Ember.Handlebars.compile('' +
    '<div class="markdownArea">{{markdown}}</div>'
);