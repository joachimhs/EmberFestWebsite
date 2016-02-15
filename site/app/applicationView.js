Emberfest.ApplicationView = Ember.View.extend({
    didInsertElement: function() {
        this._super();

        var toggles = document.querySelectorAll(".cmn-toggle-switch");

        for (var i = toggles.length - 1; i >= 0; i--) {
            var toggle = toggles[i];
            toggleHandler(toggle);
        }

        function toggleHandler(toggle) {
            toggle.addEventListener( "click", function(e) {
                e.preventDefault();
                if (this.classList.contains("active") === true) {
                    this.classList.remove("active");
                } else {
                    this.classList.add("active");
                }
            });
        }
    }
});