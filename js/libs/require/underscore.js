// Filename: /require/underscore
// Assumes _ or underscore is in the global namespace.
define(['order!libs/underscore/underscore-min'], function(){
  // Tell Require.js that this module returns  a reference to Underscore
  return _;
});