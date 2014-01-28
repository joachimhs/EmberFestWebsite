Emberfest.EmberfestAdminKeyRoute = Ember.Route.extend({
    model: function(key) {
        console.log('Emberfest.EmberfestAdminKeyRoute');
        console.log(key);
        return this.store.find('adminKey', key.admin_key_id);
    }
});