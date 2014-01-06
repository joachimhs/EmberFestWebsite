Emberfest.UserController = Ember.ObjectController.extend({
    init: function() {
        this._super();

        console.log('UserController init');
        var controller = this;
        // Mozilla Persona
        navigator.id.watch({
            loggedInUser: null,
            onlogin: function(assertion) {
                $.ajax({
                    type: 'POST',
                    url: '/auth/login',
                    data: {assertion: assertion},
                    success: function(res, status, xhr) {
                        if (res.uuidToken) {
                            console.log('setting uuidToken: ' + res.uuidToken);
                            controller.createCookie("uuidToken", res.uuidToken, 1);
                            controller.store.find('user', res.uuidToken).then(function(user) { controller.set('model', user); });
                        }
                    },
                    error: function(xhr, status, err) {  }
                });
            },

            onlogout: function() {
                $.ajax({
                    type: 'POST',
                    url: '/auth/logout',
                    success: function(xhr, status, err) {
                        console.log('onlogout: ');
                        console.log(xhr);
                        controller.set('content.id', null);
                        controller.set('content.authLevel', null);
                        controller.eraseCookie("uuidToken");
                    },
                    error: function(xhr, status, err) { console.log("error: " + status + " error: " + err); }
                });
            }
        });
    },

    createCookie:function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    },

    readCookie:function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    eraseCookie:function (name) {
        this.createCookie(name, "", -1);
    },

    isLoggedIn: function() {
        return this.get('id') != null && (this.get('authLevel') === 'user' || this.get('authLevel') === 'admin' || this.get('authLevel') === 'root')
    }.property('id', 'authLevel'),

    showRegistrationForm: function() {
        console.log('showRegistretionFormObserver: ' + this.get('id') + " authLevel: " + this.get('authLevel'));
        if (this.get('id') != null && this.get('authLevel') === 'not_registered') {
            console.log('transitioning to pages.register');
            this.transitionToRoute('register');
        }
    }.observes('uuidToken', 'authLevel'),

    contentObserver: function() {
        console.log('user model updated: ');
        console.log(this.get('model'));
    }.observes('model')
});