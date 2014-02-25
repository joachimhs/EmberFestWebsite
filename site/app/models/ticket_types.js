Emberfest.TicketType = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    price: DS.attr('number'),
    ticketsAvailable: DS.attr('number'),
    availableFrom: DS.attr('date'),
    active: DS.attr('boolean'),
    sortIndex: DS.attr('number'),

    saleStarted: function() {
        var started = false;
        if (this.get('availableFrom')) {
            var now = new Date();
            started = this.get('availableFrom') < now;
        }

        return started;
    }.property('availableFrom')
});