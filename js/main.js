// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
    paths: {
        // Major libraries
        jQuery: 'libs/require/jquery',
        Underscore: 'libs/require/underscore',
        Bootstrap: 'libs/require/bootstrap',
        Backbone: 'libs/require/backbone',
        jQueryWithUI: 'libs/require/jqueryui',
        order: 'libs/require/plugins/order',
        text: 'libs/require/plugins/text',
        templates: '../templates'
    }

});

require([
    'order!libs/jquery/jquery-1.7.1.min',
    'order!libs/underscore/underscore-min',
    'order!libs/bootstrap/bootstrap-min',
    'order!libs/backbone/backbone-min',
    'order!app'
], function($, _, Bootstrap, Backbone, App){
    // App.initialize();
});
