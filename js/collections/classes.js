define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/classes'
], function($, _, Backbone, ClassModel){
  var ClassesCollection = Backbone.Collection.extend({
    model: ClassModel,
    url: '/api/classes'
  });
 
  return ClassesCollection;
});
