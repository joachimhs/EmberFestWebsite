Emberfest.AnimateInViewMixin = Ember.Mixin.create({
    didInsertElement: function() {
        this._super();

        console.log('AnimateInViewMixin didInsertElement!!');

        this.animate();
    },

    modelObserver: function() {
        console.log('MODEL OBSERVER!!');

        this.animate();
    }.observes('model').on('init'),

    animate: function() {
        console.log('animateIn: ' + this.get('elementId'));
        console.log('parent: ' + this.get('_view'));
        console.log('animateCssClass: ' + this.get('animateCssClass'));

        var cssClass = this.get('animateCssClass');
        if (cssClass) {
            $("." + cssClass).first().hide();
            Ember.run.schedule("afterRender", function() {
                $("." + cssClass).first().fadeIn(1000);
            });
        } else {
            var elementId = this.get('elementId');
            $("#" + elementId).hide();

            Ember.run.schedule("afterRender", function() {
                $("#" + elementId).fadeIn(1000);
            });
        }
    }
});