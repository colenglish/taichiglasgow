define([
  'Underscore',
  'Backbone'
], function(_, Backbone) {
  var Movement = Backbone.Model.extend({
    url: '/api/movement'
  });
  return Movement;

});
