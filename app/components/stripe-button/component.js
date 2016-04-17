import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    triggerStripePurchase: function () {
      //if (ga) ga('send', 'pageview', '/shop/triggerPurchase');
      console.log("TRIGGERING PURCHASE!!");
      var self = this;

      var handler = self.get('stripeHandler');
      console.log("Handling stripe: " + handler);
      console.log('email: ' + self.get('stripeEmail'));

      if (handler) {
        handler.open({
          name: 'Pay with credit card',
          description: self.get('packageName'),
          amount: self.get('amountToPay'),
          email: self.get('stripeEmail'),
          currency: 'eur'
        });
      }
    }
  },

  didInsertElement: function () {
    var elementId = this.get('elementId');
    var self = this;

    var stripeHandler = StripeCheckout.configure({
      key: 'pk_live_9geD3qsefkSmBPXR1q3ruQ4B',
      image: '/images/ef_logo_square.png',
      token: function (token) {
        // Use the token to create the charge with a server-side script.
        // You can access the token ID with `token.id`
        console.log("<<<<<TOKEN>>>>>");
        console.log(token);

        //if (ga) ga('send', 'pageview', '/shop/stripeToken');

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

            //self.get('controller.controllers.user').reloadUser();
            if (res.status === "succeeded") {
              self.sendAction('paymentSuccess');
            } else {
              self.sendAction('paymnetFailed');
            }
          },
          error: function(xhr, status, err) { console.log("Payment failed. Please contact us at mail@emberfest.eu if the problem persists. error: " + status + " error: " + err); }
        });
      }
    });

    this.set('stripeHandler', stripeHandler);

    Ember.run.schedule('afterRender', function () {
      $("#" + elementId).hide().slideDown();
    });
  }
});
