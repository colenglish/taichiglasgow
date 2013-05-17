define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!templates/home.html'
], function($, _, Backbone, homeTemplate){

  var homeView = Backbone.View.extend({
    el: $("#page"),
    render: function(){
      this.$el.html(homeTemplate);
    }
  });
  return new homeView;
});
