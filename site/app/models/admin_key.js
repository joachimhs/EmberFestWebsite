Emberfest.AdminKey = DS.Model.extend({
    value: DS.attr('string'),

    prettyPrintedValue: function(a, b) {
        if (arguments.length == 2) {
            this.set('value', b);
        }

        var prettyValue = this.get('value');

        try {
            prettyValue = JSON.stringify(JSON.parse(this.get('value')),null,2);
        } catch(err) {
            //nothing
        }

        return prettyValue;
    }.property('value')
});