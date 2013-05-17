define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/clientSession',
    'text!templates/loggedIn.html'
], function($, _, Backbone, ClientSession, LoggedInTemplate){
    var LoggedInView = Backbone.View.extend({

        el: '#loggedInPanel',

        initialize: function (opts) {
            this.model = opts.clientSession || new ClientSession();
            this.model.on('loginStateChanged', this.render, this);
        },

        events: {
            'submit #login_form': 'onLogin',
            'submit #logout_form': 'onLogout'
        },

        onLogin: function(e){
            e.preventDefault();

            var that = this;

            var $form = $(e.srcElement),
                username = $form.find( 'input[name="username"]' ).val(),
                password = $form.find( 'input[name="password"]' ).val();

            $.post(
                "\\api\\login",
                { username: username, password: password },
                function( data ) {
                    that.model.set({ userName: data.username, userRole: data.role, loggedIn: true});
                }
            ).error(function() { alert("error"); })
        },

        onLogout: function(e){
            e.preventDefault();

            var that = this;

            $.post( "\\api\\logout", {},
                function( data ) {
                    that.model.set({ userName: null, userRole: null, loggedIn: false});
                }
            );
        },

        render: function () {
            this.$el.html(_.template(LoggedInTemplate, { model: this.model}));
        }
    });

    return LoggedInView;
});

