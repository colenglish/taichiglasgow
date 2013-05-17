// Filename: launchpad.js
define([
// Load the original jQuery source file
  'order!libs/require/jquery',
  'order!libs/jqueryui/jquery-ui-1.8.18.custom.min'
], function($) {
    // Tell Require.js that this module returns a reference to jQuery
    $.ajaxSetup({ cache: false });
    return $;
});