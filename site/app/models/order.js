Emberfest.Order = DS.Model.extend({
    companyName: DS.attr('string'),
    country: DS.attr('string'),
    orderNumber: DS.attr('string'),
    subtotal: DS.attr('number'),
    couponDiscount: DS.attr('number'),
    orderTotal: DS.attr('number'),
    tickets: DS.hasMany('ticket', {async: true}),

    totalAmount: function() {
        return this.get('subtotal') - this.get('couponDiscount');
    }.property('subtotal', 'couponDiscount')
});