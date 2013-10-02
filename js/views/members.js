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
            var data = {
                yinSet: [
                    { name: 'Golden Tortoise', description: 'Hard work.' },
                    { name: 'Embracing the One', description: 'Hard work.' },
                    { name: 'Lifting the Golden Plate', description: 'Hard work.' },
                    { name: 'Jade Rabbit Faces the Moon', description: 'Hard work.' },
                    { name: 'Red Capped Crane Stretches its Claws', description: 'Hard work.' },
                    { name: 'Civet Cat Catches Rats', description: 'Hard work.' },
                    { name: 'Flick the Whip on the Left and Right', description: 'Hard work.' },
                    { name: 'White Ape Shoots out its Paw', description: 'Hard work.' },
                    { name: 'Swallow Pierces the Clouds', description: 'Hard work.' },
                    { name: 'Leading a Goat Smoothly', description: 'Hard work.' },
                    { name: 'Giant Python Turning its Head', description: 'Hard work.' },
                    { name: 'Elephant Shaking its Trunk', description: 'Hard work.' }
                ],
                yangSet: [
                    { name: "Tiger's Paw", description: 'Hard work.' },
                    { name: 'A Golden Dragon Lying Around a Pillar', description: 'Hard work.' },
                    { name: 'A White Horse Raising its Hoof', description: 'Hard work.' },
                    { name: 'Fence Planted on the Left and Right', description: 'Hard work.' },
                    { name: 'Ng Kong Chopping Trees', description: 'Hard work.' },
                    { name: 'Rhinoceros Facing the Moon', description: 'Hard work.' },
                    { name: 'Lying tiger stretching its waist', description: 'Hard work.' },
                    { name: 'Tiger Coming out from its Hiding Place', description: 'Hard work.' },
                    { name: 'A Fisherman Pushing Oar', description: 'Hard work.' },
                    { name: 'Hungry Eagle Finding Food', description: 'Hard work.' },
                    { name: 'A Long-haired Monkey Climbing among the Trees', description: 'Hard work.' },
                    { name: 'An Old Man Putting his Actions and Spirit in Unity', description: 'Hard work.' }
                ]
            };
            var compiledTemplate = _.template( membersTemplate, data, _ );
            this.$el.html( compiledTemplate );

            return this;
        }
    });
    return new membersView;
});
