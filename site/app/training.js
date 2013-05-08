ECE.PagesTrainingRoute = Ember.Route.extend({
    model: function() {
        var model = Ember.Object.create();

        $.get('/mrkdwn/training.md', function(data) {
            var converter = new Showdown.converter();

            model.set('markdown', new Handlebars.SafeString(converter.makeHtml(data)));
        }, "text").error(function() {
                page.set('markdown',  "Unable to find specified page");
                //TODO: Navigate to 404 state
            });

        return model;
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        _gaq.push(['_trackPageview', "/call_for_speakers/"]);

        document.title = 'Call For Speakers - Ember Fest';
    }
});

Ember.TEMPLATES['pages/training'] = Ember.Handlebars.compile(
    '<div class="markdownArea">' +
        '{{markdown}}' +
    '</div>'
);