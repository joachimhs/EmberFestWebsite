Emberfest.TalksController = Ember.ArrayController.extend({
    init: function() {
        this._super();
        this.set('content', Emberfest.Talk.findAll());
    }
});