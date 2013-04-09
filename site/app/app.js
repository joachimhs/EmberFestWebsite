// Mozilla Persona
navigator.id.watch({
    loggedInUser: null,
    onlogin: function(assertion) {
        $.ajax({
            type: 'POST',
            url: '/auth/login',
            data: {assertion: assertion},
            success: function(res, status, xhr) {
                if (res.authFailed && ECE.get('loginClicked')) {
                    alert('Authentication Failed: ' + res.error);
                } else if (res.uuidToken) {
                    ECE.set('uuidToken', res.uuidToken);
                    console.log('setting cookie to: ' + res.uuidToken);
                    //document.cookie="uuidToken=" + res.uuidToken;
                    ECE.createCookie("uuidToken", res.uuidToken, 1);
                }

                ECE.set('attemptedLogin', true);
            },
            error: function(xhr, status, err) { ECE.router.send("doLogOut"); }
        });
    },

    onlogout: function() {
        $.ajax({
            type: 'POST',
            url: '/auth/logout',
            success: function(xhr, status, err) {
                console.log('onlogout: ');
                console.log(xhr);
                ECE.set('attemptedLogin', true);
                ECE.set('uuidToken', null);
                ECE.eraseCookie("uuidToken");
            },
            error: function(xhr, status, err) { console.log("error: " + status + " error: " + err); }
        });
    }
});

var ECE = Ember.Application.create({
    attemptedLogin:false,
    uuidToken:null,

    createCookie:function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    },

    readCookie:function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    eraseCookie:function (name) {
        this.createCookie(name, "", -1);
    }
});

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
    doLogIn: function() {
        ECE.set('loginClicked', true);
        console.log('doLogIn Action');
        navigator.id.request();
    },

    doLogOut: function() {
        console.log('doLogOut Action');
        navigator.id.logout();
    },

    showLogin: function() {
        return ECE.get('uuidToken') == null;
    }.property('ECE.uuidToken', 'ECE.attemptedLogin'),

    showLogout: function() {
        return ECE.get('attemptedLogin') === true && ECE.get('uuidToken') != null;
    }.property('ECE.uuidToken', 'ECE.attemptedLogin')
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
        '{{#if showLogin}}' +
            '<button class="btn btn-primary" {{action "doLogIn"}}>Log In</button>' +
            '{{#linkTo pages.register}}<button class="btn btn-primary">Register new account</button>{{/linkTo}}' +
        '{{/if}}' +
        '{{#if showLogout}}' +
            '<button class="btn btn-primary" {{action "doLogOut"}}>Log Out</button>' +
        '{{/if}}' +

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
        '{{#if pageFilename}}' +
            '{{#linkTo "pages.page" this}}{{pageName}}{{/linkTo}}' +
        '{{else}}' +
            '{{#if isLinkToTalks}}{{#linkTo "talks"}}{{pageName}}{{/linkTo}}{{/if}}' +
            '{{#if isLinkToCfp}}{{#linkTo "pages.callForSpeakers"}}{{pageName}}{{/linkTo}}{{/if}}' +
        '{{/if}}' +
    ' | ' +
    '{{/each}}'
);

Ember.TEMPLATES['pages/index'] = Ember.Handlebars.compile('' +
    '<div class="markdownArea">{{markdown}}</div>'
);