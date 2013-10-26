define([
  'Underscore',
  'Backbone'
], function(_, Backbone) {
  var ClassModel = Backbone.Model.extend({
    url: '/api/classes'
  });
  return ClassModel;

});
