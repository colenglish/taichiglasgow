// Filename: views/members
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!templates/members.html'
], function($, _, Backbone, membersTemplate){
  var membersView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){
    },
    render: function(){
      var data = {};
      var compiledTemplate = _.template( membersTemplate, data );
      this.$el.html( compiledTemplate ); 
    }
  });
  return new membersView;
});
