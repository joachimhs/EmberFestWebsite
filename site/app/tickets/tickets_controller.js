Emberfest.TicketsController = Ember.ArrayController.extend({
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


            basketedTickets.pushObject(Ember.Object.create({
                type: ticketType.get('id'),
                name: ticketType.get('name'),
                price: ticketType.get('price')
            }));

            ticketType.set('ticketsAvailable', ticketType.get('ticketsAvailable') - 1);

            var tickets = [];


            basketedTickets.forEach(function(ticket) {
                tickets.push({
                    type: ticket.get('type'),
                    name: ticket.get('name'),
                    price: ticket.get('price')
                });
            });

            var order = {
                orderNumber: this.get('orderNumber'),
                tickets: tickets
            };

            console.log(order);

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
                        controller.set('ticketsMd5', r.md5Hash);
                        controller.set('orderNumber', r.orderNumber);
                        controller.set('continueUrl', r.continueUrl);
                        controller.set('cancelUrl', r.cancelUrl);
                        controller.set('callbackUrl', r.callbackUrl);
                        controller.set('md5Secret', r.md5Secret);
                    }
                }
            });
        },

        removeTicketFromBasket: function(basketTicket) {
            var basketedTickets = this.get('basket');

            basketedTickets.removeObject(basketTicket);

            //Increase the available number of tickets
            this.get('model').forEach(function(ticketType) {
                if (ticketType.get('id') === basketTicket.get('id')) {
                    ticketType.set('ticketsAvailable', ticketType.get('ticketsAvailable') + 1);
                }
            });

            var tickets = [];

            basketedTickets.forEach(function(ticket) {
                tickets.push({
                    type: ticket.get('type'),
                    name: ticket.get('name'),
                    price: ticket.get('price')
                });
            });

            var order = {
                orderNumber: this.get('orderNumber'),
                tickets: tickets
            };

            var controller = this;
            $.ajax({
                type: "POST",
                url: "/json/ticketSubtotal",
                contentType: 'application/json',
                data: JSON.stringify(order),
                success: function(r) {
                    if (r.numTickets && r.subtotal) {
                        controller.set('numTickets', r.numTickets);
                        controller.set('ticketSubtotal', r.subtotal);
                        controller.set('ticketSubtotalEur', r.subtotal / 100);
                        controller.set('ticketsMd5', r.md5Hash);
                        controller.set('orderNumber', r.orderNumber);
                        controller.set('continueUrl', r.continueUrl);
                        controller.set('cancelUrl', r.cancelUrl);
                        controller.set('callbackUrl', r.callbackUrl);
                        controller.set('md5Secret', r.md5Secret);
                    }
                }
            });
        }
    }
});