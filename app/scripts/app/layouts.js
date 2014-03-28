(function(root) {
  'use strict';

  root.App.module('Layouts', function(Layouts,  App, Backbone, Marionette, $, _) {

    Layouts.Header = Marionette.Layout.extend({
      template: '#layout-header'
    });

    Layouts.Footer = Marionette.Layout.extend({
      template: '#layout-footer'
    });

    Layouts.Sidebar = Marionette.Layout.extend({
      template: '#layout-sidebar',

      regions: {
        regionNavPeople: '#nav-people',
        regionNavSearch: '#nav-search',
        regionNavContent: '#nav-content'
      },

      onRender: function() {
        this.regionNavPeople.show(new App.Views.NavPeople());
        this.regionNavSearch.show(new App.Views.NavSearch());
        this.regionNavContent.show(new App.Views.NavContent());
      }
    });


  });
})(this);
