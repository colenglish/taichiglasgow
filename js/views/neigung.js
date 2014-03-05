// Filename: views/members
define([
    'jQuery',
    'Underscore',
    'Backbone',
    'collections/form',
    'text!templates/neigung.html'
], function($, _, Backbone, Form, NeigungTemplate){
    var neiGungView = Backbone.View.extend({
        el: $("#page"),
        initialize: function(){
        },

        render: function (formRouteName, formTitle) {
            var that = this;
            var collection = new Form({ route: formRouteName, title: formTitle });
            collection.fetch({
                success: function(collection) {
                    $(that.el).html(_.template(NeigungTemplate, { title: collection.title, exercises: collection.models, _:_}));
                }
            });
            return this;
        }
    });
    return new neiGungView;
});
