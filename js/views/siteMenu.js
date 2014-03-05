define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/clientSession',
    'text!templates/siteMenu.html'
], function($, _, Backbone, ClientSession, SiteMenuTemplate){
    var SiteMenu = Backbone.View.extend({

        el: '#sitemenu',

        initialize: function (opts) {
            this.session = opts.clientSession || new ClientSession();
            this.session.on('loginStateChanged', this.render, this);

            this.standardmenuitems = [
                { label: "Home", url: "#" },
                { label: "Classes", url: "#/classes" },
                { label: "Events", url: "#/events" }
            ];

            this.membermenuitems = _.union(this.standardmenuitems, [
                { label: "Nei Gung", url: "#/neigung/yin" }
            ])
        },

        render: function () {
            var menuitems = this.session.get('loggedIn') ? this.membermenuitems : this.standardmenuitems;
            this.$el.html(_.template(SiteMenuTemplate, { items: menuitems }));
            return this;
        }
    });

    return SiteMenu;
});

