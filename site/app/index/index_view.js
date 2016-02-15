Emberfest.ApplicationView = Ember.View.extend({
    didInsertElement: function() {
        this._super();

        console.log('AnimateInViewMixin didInsertElement!!');

        this.animate();
    },

    animate: function() {
        var elementId = this.get('elementId');
        $("#" + elementId).hide();

        Ember.run.schedule("afterRender", function() {
            $("#" + elementId).fadeIn(500);
        });
    }
});