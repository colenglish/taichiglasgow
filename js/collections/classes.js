define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/classes'
], function($, _, Backbone, ClassModel){
  var ClassesCollection = Backbone.Collection.extend({
    model: ClassModel,
    url: 'http://localhost:5000/api/classes'
  });
 
  return ClassesCollection;
});
