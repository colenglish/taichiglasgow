// Filename: app.js
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'router',
  'models/clientSession',
  'views/loggedIn',
  'views/siteMenu'
], function($, _, Backbone, Router, ClientSession, LoggedInView, SiteMenuView){
    var AppView = Backbone.View.extend({

        initialize: function () {
            this.model = new ClientSession();
            Router.initialize({ clientSession: this.model });
            this.loggedInPanel = new LoggedInView({ clientSession: this.model });
            this.loggedInPanel.render();
            this.siteMenu = new SiteMenuView({ clientSession: this.model });
            this.siteMenu.render();
        },

        render: function () {
        }
    });

    return new AppView();
});

