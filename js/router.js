// Filename: router.js
define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/home',
    'views/events',
    'views/neigung'
], function($, _, Backbone, homeView, eventsView, neiGungView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            'events': 'showEvents',
            'neigung/:setname': 'showNeiGung',
            'logged-in': 'configureClientSession',

            // Default
            '*actions': 'defaultAction'
        },

        showEvents: function(){
            eventsView.render();
        },

        showNeiGung: function(setname){
            if (setname === "yang"){
                neiGungView.render("yangneigung", "Yang Nei Gung");
            }
            else {
                neiGungView.render("yinneigung", "Yin Nei Gung");
            }

        },

        configureClientSession: function(){
            var that = this;
            $.get(
                "\\api\\user",
                function( data ) {
                    that.clientSession.set({ userName: data.username, userRole: data.role, loggedIn: true});
                }
            ).error(homeView.render())
        },

        defaultAction: function(actions){
            // We have no matching route, lets display the home page
            homeView.render();
        }
    });

    var initialize = function(opts){
        var app_router = new AppRouter();
        app_router.clientSession = opts.clientSession;
        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
