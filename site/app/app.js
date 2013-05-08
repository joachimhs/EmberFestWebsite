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
        this.route("training", {path: "/training"});
        this.route("page", {path: "/pages/:page_id"});
    });
});

ECE.IndexRoute = Ember.Route.extend({
    model: function() {
        return ECE.Page.findAll();
    }
});

ECE.ApplicationController = Ember.Controller.extend({
  getCurrentPath: function() {
    return this.get('currentPath');
  }.observes('currentPath')
});

ECE.HeaderController = Ember.ArrayController.extend({
    needs: ['application'],
    init: function() {
        this._super();
        this.set('content', ECE.TopPage.findAll());
        var applicationController = this.get('controllers.application');
        this.set('routeName', applicationController.get('currentPath'));
    }
    // isActive: Ember.computed(function () {
    //     console.log(this.get('routeName'));
    //     return true;
    // })
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
    '<div id="wrap">' +
        '<div id="mainArea">' +
            '<div class="logo-header">' +
                '<h2><span class="emberfestlogo"><img src="/img/ece_logo.png"></span> 2013</h2>' +
                '<h3>Munich, Germany, August 28th - August 30th</h3>' +
                '{{render loginArea}}' +
                '<span class="logo"><img src="/img/ember-productivity-sm.png"></span>' +
            '</div>' +
            '<div id="toolbarArea">' +
                '{{render header}}' +
            '</div>' +
            '<div id="contentArea">{{outlet}}</div>' +
            '{{render sponsors}}' +
            '{{render social}}' +
        '</div>' +
    '</div>'
);


ECE.HeaderView = Ember.View.extend({
    tagName: 'div'
});

Ember.TEMPLATES['header'] = Ember.Handlebars.compile('' +
    '<ul class="nav nav-list toolbar-nav">' +
        '<li>{{#linkTo "pages.index"}}{{view ECE.LiviconView dataName="home" dataSize="16"}} Home/About{{/linkTo}}</li>' +
        '<li>{{#linkTo "talks"}}{{view ECE.LiviconView dataName="comments" dataSize="16"}} Talks{{/linkTo}}</li>' +
        '<li>{{#linkTo "pages.training"}}{{view ECE.LiviconView dataName="signal" dataSize="16"}} Training{{/linkTo}}</li>' +
        '<li>{{#linkTo "pages.callForSpeakers"}}{{view ECE.LiviconView dataName="notebook" dataSize="16"}} Submit a proposal{{/linkTo}}</li>' +
    '</ul>'
);

 Ember.TEMPLATES['sponsors'] = Ember.Handlebars.compile('' +
     '<div class="hotelArea container-fluid">' +
        '<div class="row-fluid">' +
            '<div class="span12">' +
                '<h2>{{view ECE.LiviconView dataName="trophy" dataSize="24"}} Sponsors</h2>' +
                 '<table class="" style="width: 100%;">' +
                 '<tr>' +
                 '<td class="well" style="width: 250px;"><a href="http://www.manning.com"><img src="/img/manning.png" /></a></td>' +
                 '<td class="well" style="width: 250px;"><a href="http://www.infoq.com"><img src="/img/infoq.png" /></a></td>' +
                 '<td class="well" style="width: 250px; text-align: center;"><a href="/pages/sponsors">Become a sponsor!</a></td>' +
                 '</tr>' +
                 '</table>' +
            '</div>' +
        '</div>' +
     '</div>'
 );

Ember.TEMPLATES['social'] = Ember.Handlebars.compile(
    '<div class="container-fluid"><div class="span12 footer"><a href="https://twitter.com/EmberFest"><i class="icon-2x icon-twitter"></i></a><a href="https://github.com/joachimhs/EmberFestWebsite" class="github"><i class="icon-2x icon-github"></i></a></div>'
);

ECE.LiviconView = Ember.View.extend({
    tagName: 'span',
    classNames: ['livicon'],

    //template: Ember.Handlebars.compile('<span class="livicon" {{bindAttr data-name="view.dataName"}} data-color="black" {{bindAttr data-size="view.dataSize"}} style="margin-right: 10px;">'),

    dataNameObserver: function() {
        console.log('dataNameObserver; ' + this.get('dataName'));
        this.rerender();
    }.observes('dataName'),

    didInsertElement: function() {
        console.log('Livicon didInsertElement: ' + this.get('dataName') + " " + this.get('dataSize'));
        this.createLivicon();
    },

    createLivicon: function() {
        var elementId = this.get('elementId');
        var size = this.get('dataSize');
        var iconname = this.get('dataName');
        var color = "black";
        var hovercolor = "blue";
        var animate = true;
        var looped = true;
        var iteration = false;
        var customduration = 600;
        var defeventtype = "hover";
        var icondata = null;
        var scalefactor = size/32;
        var onparent = this.$().parent();

        $("#" + elementId).css({"width":size,"height":size});
        $("#" + elementId).attr("data-name", iconname);
        $("#" + elementId).attr("data-size", size);
        $("#" + elementId).attr("data-color", color);

        var customattr = $("#" + elementId).data();
        console.log(customattr);

        var eventtype = customattr.eventtype||customattr.et ? customattr.eventtype||customattr.et : defeventtype;

        console.log('eventtype: ' + eventtype);

        if (iconname in liviconsdata) {
            icondata = liviconsdata[iconname];
        } else {
            icondata = liviconsdata[defname];
        };

        console.log(icondata);

        Raphael(elementId, size, size).createLivicon(elementId, iconname, size, color, hovercolor, animate, looped, iteration, customduration, eventtype, icondata, scalefactor, onparent);
    }
});

Ember.TEMPLATES['pages/index'] = Ember.Handlebars.compile('' +
    '<div class="hotelArea container-fluid">' +
        '<div class="row-fluid">' +
            '<div class="what span12">' +
                '<h2>{{view ECE.LiviconView dataName="info" dataSize="24"}}What?</h2>' +
                '<p>The Biggest Ember.js Event in Europe. The first two days will be a hands on 2-day introductory course on Ember.js, while the third day will be organized as a single-track mini-conference with talks and tutorials. ' +
                'Training, talks and tutorials will be held by people with first hand Ember.js experience, where they will share their knowledge and spread the word on Ember.js awesomeness!</p>' +
            '</div>' +
            '<div class="where">' +
                '<h2>{{view ECE.LiviconView dataName="location" dataSize="24"}}Where?</h2>' +
                '<span class="city">Munich City Centre, Munich, Germany</span></div><p>The first two days will be a hands on 2-day introductory course on Ember.js, while the third day will be organized as a single-track mini-conference with talks and tutorials. ' +
                'Training, talks and tutorials will be held by people with first hand Ember.js experience, where they will share their knowledge and spread the word on Ember.js awesomeness!</p>' +
                '<a href="http://www.google.com/maps?f=q&amp;hl=de&amp;geocode=&amp;q=hochstrasse+3,+munich&amp;sll=37.0625,-95.677068&amp;sspn=27.919765,59.238281&amp;ie=UTF8&amp;ll=48.133158,11.589847&amp;spn=0.011457,0.028925&amp;z=15&amp;iwloc=addr&amp;om=1"><img src="/img/venue_location.png"></a>' +
            '</div>' +
            '<div class="tickets">' +
                '<h2>{{view ECE.LiviconView dataName="credit-card" dataSize="24"}}Tickets</h2>' +
                '<iframe src="https://www.eventora.com/en/embed/ember-fest" width="680px" height="300px" style="border:0" allowtransparency="true" scrolling="auto" vspace="0" hspace="0" frameborder="0"></iframe>' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<div class="markdownArea">{{markdown}}</div>'
);