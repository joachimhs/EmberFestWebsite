Emberfest.EmberfestAdminKeyController = Ember.ObjectController.extend({
    actions: {
        saveKey: function(key) {
            key.save();
        },

        resetKey: function(key) {
            key.rollback();
        },

        deleteKey: function(key) {
            key.deleteRecord();

            var controller = this;
            key.save().then(function(data) {
                console.log('Deleting key. Transitioning');
                controller.transitionToRoute('emberfestAdmin');
            }, function(data) {
                console.log('Deleting key. Transitioning2');
                controller.transitionToRoute('emberfestAdmin');
            });
        }
    }
});