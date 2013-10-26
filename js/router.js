// Filename: router.js
define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/home',
    'views/classes',
    'views/events',
    'views/members'
], function($, _, Backbone, homeView, classesView, eventsView, membersView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            'classes': 'showClasses',
            'events': 'showEvents',
            'members': 'showMembers',
            'logged-in': 'configureClientSession',

            // Default
            '*actions': 'defaultAction'
        },
        showClasses: function(){
            classesView.render();
        },

        showEvents: function(){
            eventsView.render();
        },

        showMembers: function(){
            membersView.render();
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
