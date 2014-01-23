Emberfest.AdminRoute = Ember.Route.extend({
    model: function() {
        var data = [];

        data.pushObject(this.store.createRecord('adminData', {
            id: 'users'
        }));

        console.log('AdminRoute model');
        console.log(data[0]);

        data.pushObject(this.store.createRecord('adminData', {
            id: 'talks'
        }));

        data.pushObject(this.store.createRecord('adminData', {
            id: 'cookies'
        }));

        data.pushObject(this.store.createRecord('adminData', {
            id: 'tickets'
        }));

        return data;
    }
});