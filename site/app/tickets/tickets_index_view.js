Emberfest.TicketsIndexView = Ember.View.extend({
    didInsertElement: function() {
        this._super();

        console.log('creating stripe handler: ' + this.get('controller'));
        var self = this;
        var stripeHandler = StripeCheckout.configure({
            key: 'pk_live_9geD3qsefkSmBPXR1q3ruQ4B',
            image: '/square-image.png',
            token: function(token) {
                // Use the token to create the charge with a server-side script.
                // You can access the token ID with `token.id`
                console.log("<<<<<TOKEN>>>>>");
                console.log(token);

                var postContent = {
                    stripeToken: token.id,
                    stripeTokenType: token.type,
                    stripeEmail: token.email,
                    order: self.get('controller.orderNumber')
                };

                $.ajax({
                    type: 'POST',
                    url: '/emberfest/stripePayment',
                    data: JSON.stringify(postContent),

                    success: function(res, status, xhr) {
                        console.log("SUCCESSFUL PURCHASE!!!!");
                        console.log(res);

                        self.get('controller.controllers.user').reloadUser();
                        if (res.status === "succeeded") {
                            self.get('controller').transitionToRoute('tickets.purchased');
                        } else {
                            self.get('controller').transitionToRoute('tickets.cancelled');
                        }
                    },
                    error: function(xhr, status, err) { console.log("error: " + status + " error: " + err); }
                });
            }
        });

        this.set('controller.stripeHandler', stripeHandler);
    },

    willDestroyElement: function ()
    {
        if (this.get('stripeHandler')) {
            this.get('stripeHandler').close();
        }
    }
});