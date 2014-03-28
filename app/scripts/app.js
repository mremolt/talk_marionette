(function(root) {
  'use strict';

  var App = new Marionette.Application();

  App.addRegions({
    headerRegion: '#header',
    contentRegion: '#content',
    sidebarRegion: '#aside-nav',
    footerRegion: '#footer'
  });

  App.on('initialize:after', function() {
    App.headerRegion.show(new App.Layouts.Header());
    App.footerRegion.show(new App.Layouts.Footer());
    App.sidebarRegion.show(new App.Layouts.Sidebar());

    if (Backbone.history) {
      Backbone.history.start();

      if (App.Utils.currentRoute() == '') {
        App.request('people:index');
      }
    }
  });

  root.App = App;
})(this);
