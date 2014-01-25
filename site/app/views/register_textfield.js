Emberfest.RegisterTextfield = Ember.TextField.extend({
    focusOut: function() {
        console.log(this.get('controller'));
        this.get('controller').verifyInput();
    }
});