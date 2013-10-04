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
            'submit #logout_form': 'onLogout'
        },

        onLogout: function(e){
            e.preventDefault();

            var that = this;

            $.post( "\\logout", {},
                function( data ) {
                    that.model.set({ userName: null, userRole: null, loggedIn: false});
                }
            );
        },

        render: function () {
            this.$el.html(_.template(LoggedInTemplate, { model: this.model}));
            return this;
        }
    });

    return LoggedInView;
});

