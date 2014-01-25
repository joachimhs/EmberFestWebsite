Emberfest.TicketType = DS.Model.extend({
    name: DS.attr('string'),
    ticketsAvailable: DS.attr('number'),
    price: DS.attr('number'),
    description: DS.attr('string')
});