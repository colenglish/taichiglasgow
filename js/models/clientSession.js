define([
    'Underscore',
    'Backbone'
], function(_, Backbone) {
    var ClientSession = Backbone.Model.extend({

        defaults: {
            loggedIn: false,
            userName: null,
            userRole: null
        },

        initialize: function() {
            if (window.sessionStorage){
                this.set({
                    loggedIn: JSON.parse(window.sessionStorage['loggedIn']), // ensure we get the bool out if it's there, not a string
                    userName: window.sessionStorage['userName'],
                    userRole: window.sessionStorage['userRole']
                });
            }
            this.bind('change:loggedIn', this.onLoggedInChange, this);

        },

        onLoggedInChange: function () {
            if (window.sessionStorage){
                window.sessionStorage['loggedIn'] = this.get('loggedIn');
                window.sessionStorage['userName'] = this.get('userName');
                window.sessionStorage['userRole'] = this.get('userRole');
            }
            this.trigger('loginStateChanged');
        }
    });

    return ClientSession;
});

