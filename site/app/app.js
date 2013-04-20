var ECE = Ember.Application.create();

ECE.Router = Ember.Router.extend({
    location: 'history'
});

ECE.Router.map(function() {
    this.resource("pages", {path: "/"}, function() {
        this.route("register", {path: "/register"});
        this.route("callForSpeakers", {path: "/call_for_speakers"});
        this.resource("talks", {path: "/talks"}, function() {
            this.route("talk", {path: "/:talk_id"});
        });
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
            $.get('/mrkdwn/index.md', function(data) {
                controller.set('markdown', new Handlebars.SafeString(new Showdown.converter().makeHtml(data)));
            });
        }
    },

    contentObserver: function() {
        this.parseMarkdown();
    }.observes('controllers.pages.content.length')
});

ECE.ApplicationView = Ember.View.extend({
    classNames: ['appArea']
});

Ember.TEMPLATES['application'] = Ember.Handlebars.compile('' +
    '<div id="toolbarArea">' +
        '<span style="font-weight: bold; font-size: 1.5em;">Ember</span><span style="color: rgb(100,12,8); font-size: 1.5em; font-style: italic;">Fest</span>' +
        '<span id="headerLinks">' +
            '{{render header}}' +
            '{{render loginArea}}' +
        '</span>' +
    '</div>' +
    '<div id="mainArea">' +
        '<div id="contentArea">{{outlet}}</div>' +
    '</div>' +
    '{{render sponsors}}'
);


ECE.HeaderView = Ember.View.extend({
    tagName: 'span'

});

Ember.TEMPLATES['header'] = Ember.Handlebars.compile('' +
    '{{#each controllers.pages.arrangedContent}}' +
        '{{#if pageFilename}}' +
            '{{#linkTo "pages.page" this}}{{pageName}}{{/linkTo}}' +
        '{{else}}' +
            '{{#if isLinkToTalks}}{{#linkTo "talks"}}{{pageName}}{{/linkTo}}{{/if}}' +
            '{{#if isLinkToCfp}}{{#linkTo "pages.callForSpeakers"}}{{pageName}}{{/linkTo}}{{/if}}' +
            '{{#if isLinkToHome}}{{#linkTo "pages"}}{{pageName}}{{/linkTo}}{{/if}}' +
        '{{/if}}' +
    ' ' +
    '{{/each}}'
);

Ember.TEMPLATES['sponsors'] = Ember.Handlebars.compile('' +
    '<div id="sponsorArea" style="float:right;">' +
        '<table style="width: 250px;">' +
            '<tr><td><h1 style="text-align: center; text-decoration: underline;">Sponsors:</h1></td></tr>' +
            '<tr><td><a href="http://www.manning.com"><img src="/img/manning.png" /></a></td></tr>' +
            '<tr><td><a href="/pages/sponsors">Become a sponsor!</a></td></tr>' +
        '</table>' +
    '</div>'
);

Ember.TEMPLATES['pages/index'] = Ember.Handlebars.compile('' +
    '<div id="hotelArea" class="container-fluid">' +
        '<div class="row-fluid">' +
            '<div id="eventDescription" class="span12">' +
                '<h1>The Biggest Ember.js Event in Europe!</h1>' +
                '<img src="/img/venue.jpg" style="float:right; width: 350px; height: 300px;">' +
                '<p>Ember Fest takes place in Munich, Germany and will be a three day event from August 28th until August 30th. This will by far be the European Ember.js event this year!</p>' +
                '<p>The goal of Ember Fest is split into two parts. The first two days will be a hands on 2-day introductory course on Ember.js, while the third day will be organized as a single-track mini-conference with talks and tutorials.</p>' +
                '<p>Training, talks and tutorials will be held by people with first hand Ember.js experience, where they will share their knowledge and spread the word on Ember.js awesomeness!</p>' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<div class="markdownArea">{{markdown}}</div>'

);