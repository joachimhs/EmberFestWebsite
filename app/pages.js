ECE.PagesRoute = Ember.Route.extend({
    model: function() {
        return ECE.Page.findAll();
    },

    setupController: function(controller, model) {
        this._super(controller, model);
    }
});

ECE.PagesController = Ember.ArrayController.extend({
    sortProperties: ['pageSortIndex'],
    sortAscending: true
});

ECE.PagesPageRoute = Ember.Route.extend({
    model: function(id) {
        return ECE.Page.find(id.page_id);
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/pages/" + model.get('id')]);
    }
});

ECE.PagesPageController = Ember.Controller.extend({
    content: null,

    contentObserver: function() {
        if (this.get('content.isLoaded')) {
            var page = this.get('content');

            $.get('/mrkdwn/' + this.get('content.pageFilename'), function(data) {
                var converter = new Showdown.converter();

                page.set('markdown', new Handlebars.SafeString(converter.makeHtml(data)));
            }, "text").error(function() {
                    page.set('markdown',  "Unable to find specified page");
                    //TODO: Navigate to 404 state
                });

            document.title = page.get('pageName') + ' - Ember Camp Europe';
        }
    }.observes('content.isLoaded')
});

Ember.TEMPLATES['pages'] = Ember.Handlebars.compile('' +
    '<div class="markdownArea">{{outlet}}</div>'
);

Ember.TEMPLATES['pages/page'] = Ember.Handlebars.compile('' +
    '{{#if content.isLoaded}}{{content.markdown}}{{/if}}'
);