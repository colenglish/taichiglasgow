// Filename: views/classes
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'collections/classes',
  'text!templates/classes.html'
], function($, _, Backbone, ClassesCollection, classesTemplate){
  var classesView = Backbone.View.extend({
    el: $("#page"),
    
    initialize: function(){
    },
    
    render: function () {
      var that = this;
      var classes = new ClassesCollection();
      classes.fetch({
        success: function(classes) {
          $(that.el).html(_.template(classesTemplate, {classes: classes.models, _:_}));
        }
      });
    }
  });
  return new classesView;
});