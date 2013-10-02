// Filename: views/events
define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/events.html'
], function($, _, Backbone, eventsTemplate){
    var eventsView = Backbone.View.extend({
        el: $("#page"),
        initialize: function(){
        },
        render: function(){
            var data = {};
            var compiledTemplate = _.template( eventsTemplate, data );
            this.$el.html( compiledTemplate );
            return this;
        }
    });
    return new eventsView;
});
