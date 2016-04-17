import Ember from 'ember';

export default Ember.Service.extend({
  routing: Ember.inject.service('-routing'),

  init: function() {
    this._super();

    console.log('Session Service init');

    var uuidToken = this.readCookie('uuidToken');
    if (uuidToken) {
      this.performLoginCheck(uuidToken);
    } else {
      this.initializePersona();
    }
  },

  performLoginCheck: function(uuidToken) {
    var controller = this;
    controller.store.find('user', uuidToken).then(function(user) {
      controller.set('model', user);
      controller.initializePersona();
    }, function(user) {
      controller.eraseCookie('uuidToken');
      controller.initializePersona();
    });
  },

  initializePersona: function() {
    var controller = this;
    var loggedIn = controller.get('user.userId');

    console.log('calling navigator.id.watch()');
    // Mozilla Persona
    navigator.id.watch({
      loggedInUser: loggedIn,

      onlogin: function(assertion) {
        console.log("onlogin");
        $.ajax({
          type: 'POST',
          url: '/auth/login',
          data: {assertion: assertion},
          success: function(res, status, xhr) {
            if (res.uuidToken && res.uuidToken != controller.readCookie('uuidToken')) {
              console.log('setting uuidToken: ' + res.uuidToken);
              controller.createCookie("uuidToken", res.uuidToken, 1);
              controller.store.find('user', res.uuidToken).then(function(user) { controller.set('model', user); });
            }
          },
          error: function(xhr, status, err) {  }
        });
      },

      onlogout: function() {
        console.log("onlogout");
        $.ajax({
          type: 'POST',
          url: '/auth/logout',
          success: function(xhr, status, err) {
            console.log('onlogout: ');
            console.log(xhr);
            if (controller.get('content.id')) {
              controller.set('content.id', null);
              controller.set('content.authLevel', null);
            }
            controller.eraseCookie("uuidToken");
          },
          error: function(xhr, status, err) { console.log("error: " + status + " error: " + err); }
        });
      }
    });
  },

  createCookie:function (name, value, days) {
    var expires = "";

    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      expires = "; expires="+date.toGMTString();
    }
    else expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  },

  readCookie:function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },


  eraseCookie:function (name) {
    this.createCookie(name, "", -1);
  },

  reloadUser: function() {
    this.get('model').reload();
  },

  isLoggedIn: function() {
    return this.get('id') !== null && (this.get('model.authLevel') === 'user' || this.get('model.authLevel') === 'admin' || this.get('model.authLevel') === 'root');
  }.property('model.id', 'model.authLevel'),

  showRegistrationForm: function() {
    console.log('showRegistretionFormObserver: ' + this.get('id') + " authLevel: " + this.get('authLevel'));
    console.log(this.get("routing"));
    if (this.get('id') !== null && this.get('model.authLevel') === 'not_registered') {
      console.log('transitioning to pages.register');
      this.get('routing').transitionTo('register');
    }
  }.observes('uuidToken', 'model.authLevel')
});
