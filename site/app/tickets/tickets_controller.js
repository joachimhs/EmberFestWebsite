Emberfest.TicketsIndexController = Ember.ArrayController.extend({
    sortProperties: ['sortIndex'],
    sortAscending: true,

    needs: ['user'],

    actions: {
        doLogIn: function() {
            console.log('doLogIn Action');
            navigator.id.request();
        },

        addTicketTypeToBasket: function(ticketType) {
            console.log('addTicketTypeToBasket: ' + ticketType.get('name'));
            var basketedTickets = this.get('basket');
            if (!basketedTickets) {
                basketedTickets = [];
                this.set('basket', basketedTickets);
            }

            var newTicket = Ember.Object.create({
                type: ticketType.get('id'),
                name: ticketType.get('name'),
                price: ticketType.get('price')
            });

            ticketType.set('ticketsAvailable', ticketType.get('ticketsAvailable') - 1);

            var order = this.buildOrder(newTicket);

            var controller = this;
            controller.attemptToAddTicketToBasket(order);
        },

        addCouponCode: function() {
            if (this.get('couponCode')) {
                console.log('Coupon Code: ' + this.get('couponCode'));
            }

            var order = this.buildOrder();
            this.attemptToAddTicketToBasket(order);
        },

        removeTicketFromBasket: function(basketTicket) {
            var basketedTickets = this.get('basket');
            console.log(basketTicket.get('type'));

            basketedTickets.removeObject(basketTicket);

            if (basketedTickets.get('length') === 0) {
                this.set('basket', []);
                this.set('numTickets', 0);
                this.set('ticketSubtotal', 0);
                this.set('ticketDiscountAmount', 0);
            }

            //Increase the available number of tickets
            this.get('model').forEach(function(ticketType) {
                if (ticketType.get('id') === basketTicket.get('type')) {
                    ticketType.set('ticketsAvailable', ticketType.get('ticketsAvailable') + 1);
                }
            });

            var order = this.buildOrder();

            var controller = this;
            controller.attemptToAddTicketToBasket(order);
        }
    },

    buildOrder: function(newTicket) {
        var basketedTickets = this.get('basket');

        var tickets = [];

        if (basketedTickets) {
            basketedTickets.forEach(function(ticket) {
                tickets.push({
                    type: ticket.get('type'),
                    name: ticket.get('name'),
                    price: ticket.get('price')
                });
            });
        }

        if (newTicket) {
            tickets.push(newTicket);
        }

        var order = {
            orderNumber: this.get('orderNumber'),
            tickets: tickets,
            couponCode: this.get('couponCode')
        };

        return order;
    },

    attemptToAddTicketToBasket: function(order) {
        var controller = this;

        $.ajax({
            type: "POST",
            url: "/json/ticketSubtotal",
            contentType: 'application/json',
            data: JSON.stringify(order),
            success: function(r) {
                console.log(r);
                if (r.numTickets && r.subtotal) {
                    controller.set('numTickets', r.numTickets);
                    controller.set('ticketSubtotal', r.subtotal);
                    controller.set('ticketSubtotalEur', r.subtotal / 100);
                    if (r.discount !== null) {
                        controller.set('ticketDiscountAmount', r.discount / 100);
                    } else {
                        controller.set('ticketDiscountAmount', 0);
                    }

                    if (r.couponCode) {
                        controller.set('couponCode', r.couponCode);
                    }
                    controller.set('ticketsMd5', r.md5Hash);
                    controller.set('orderNumber', r.orderNumber);
                    controller.set('continueUrl', r.continueUrl);
                    controller.set('cancelUrl', r.cancelUrl);
                    controller.set('callbackUrl', r.callbackUrl);
                    if (r.testmode) {
                        controller.set('testmode', r.testmode);
                    }
                    controller.set('md5Secret', r.md5Secret);

                    var basket = [];

                    console.log(r.basket);
                    for (var index = 0; index < r.basket.length; index++) {
                        var item = r.basket[index];
                        basket.pushObject(Ember.Object.create({
                            name: item.name,
                            price: item.price,
                            type: item.type
                        }));
                    }

                    controller.set('basket', basket);
                }
            }
        });
    },

    userObserver: function() {
        console.log('USER OBSERVER: ' + this.get('controllers.user.isLoggedIn'));

        var controller = this;
        if (this.get('controllers.user.isLoggedIn')) {
            $.ajax({
                type: "GET",
                url: "/json/ticketSubtotal",
                contentType: 'application/json',
                success: function(r) {
                    console.log(r);
                    if (r.numTickets && r.subtotal) {
                        controller.set('numTickets', r.numTickets);
                        controller.set('ticketSubtotal', r.subtotal);
                        controller.set('ticketSubtotalEur', r.subtotal / 100);
                        if (r.discount) {
                            controller.set('ticketDiscountAmount', r.discount / 100);
                        } else {
                            controller.set('ticketDiscountAmount', 0);
                        }

                        if (r.couponCode) {
                            controller.set('couponCode', r.couponCode);
                        }
                        controller.set('ticketsMd5', r.md5Hash);
                        controller.set('orderNumber', r.orderNumber);
                        controller.set('continueUrl', r.continueUrl);
                        controller.set('cancelUrl', r.cancelUrl);
                        controller.set('callbackUrl', r.callbackUrl);
                        if (r.testmode) {
                            controller.set('testmode', r.testmode);
                        }
                        controller.set('md5Secret', r.md5Secret);

                        var basket = [];

                        console.log(r.basket);
                        for (var index = 0; index < r.basket.length; index++) {
                            var item = r.basket[index];
                            basket.pushObject(Ember.Object.create({
                                name: item.name,
                                price: item.price,
                                type: item.type
                            }));
                        }

                        controller.set('basket', basket);
                    }
                }
            });
        }
    }.observes('controllers.user.isLoggedIn').on('init')
});