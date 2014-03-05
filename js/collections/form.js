define([
    'jQuery',
    'Underscore',
    'Backbone',
    'models/movement'
], function($, _, Backbone, Movement){
    var Form = Backbone.Collection.extend({
        model: Movement,

        initialize: function(props) {
            this.title = props.title;
            this.url = '/api/form/' + props.route;
        }
    });

    return Form;
});
