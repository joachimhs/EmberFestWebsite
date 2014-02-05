Emberfest.TicketType = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    price: DS.attr('number'),
    ticketsAvailable: DS.attr('number'),
    availableFrom: DS.attr('date')
});