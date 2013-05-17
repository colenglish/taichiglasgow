define([
  'Underscore',
  'Backbone'
], function(_, Backbone) {
  var ClassModel = Backbone.Model.extend({
    url: 'http://localhost:5000/api/classes'
  });
  return ClassModel;

});
