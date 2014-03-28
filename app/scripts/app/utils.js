(function(root) {
  'use strict';

  root.App.module('Utils', function(Utils,  App, Backbone, Marionette, $, _) {

    Utils.navigate = function(route) {
      Backbone.history.navigate(route);
    };

    Utils.currentRoute = function() {
      return Backbone.history.fragment;
    };

  });
})(this);
