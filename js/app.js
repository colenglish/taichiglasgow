// Filename: app.js
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'router',
  'models/clientSession',
  'views/loggedIn'
], function($, _, Backbone, Router, ClientSession, LoggedInView){
    var AppView = Backbone.View.extend({

        initialize: function () {
            this.model = new ClientSession();
            Router.initialize({ clientSession: this.model });
            this.loggedInPanel = new LoggedInView({ clientSession: this.model });
            this.loggedInPanel.render();
        },

        render: function () {
        }
    });

    return new AppView();
});

