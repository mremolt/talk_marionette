(function(root) {
  'use strict';

  root.App.module('Controllers', function(Controllers, App, Backbone, Marionette, $, _) {

    var people = new App.Models.People();

    Controllers.PeopleRouter = Marionette.AppRouter.extend({

      appRoutes: {
        'people': 'index',
        'people/new': 'new',
        'people/:id': 'show'
      }

    });

    Controllers.PeopleController = Marionette.Controller.extend({
      index: function() {
        people.fetch().then(function() {
          App.contentRegion.show(new App.Views.People({ collection: people }));
        });
      },

      show: function(idOrModel) {
        var dfd = new $.Deferred();

        if (_.isObject(idOrModel)) {
          dfd.resolve(idOrModel);
        } else {
          people.fetch().then(function() {
            dfd.resolve(people.get(idOrModel));
          });
        }

        $.when(dfd).then(function(person) {
          App.contentRegion.show(new App.Views.PersonDetail({ model: person }));
        });
      },

      new: function() {
        App.contentRegion.show(new App.Views.PersonNew());
      },

      search: function(q) {
        var result;

        people.fetch().then(function() {
          result = people.filter(function(item) {
            return item.match(q);
          });
          result = new App.Models.People(result);
          App.vent.trigger('people:changed', result);

          App.contentRegion.show(new App.Views.People({ collection: result }));
        });
      }
    });


    var controller = new Controllers.PeopleController();


    App.reqres.setHandler('people:index', function() {
      App.Utils.navigate('people');
      controller.index();
    });

    App.reqres.setHandler('people:show', function(model) {
      App.Utils.navigate('people/' + model.id);
      controller.show(model);
    });

    App.reqres.setHandler('people:new', function() {
      App.Utils.navigate('people/new');
      controller.new();
    });

    App.reqres.setHandler('people:search', function(q) {
      App.Utils.navigate('people');
      controller.search(q);
    });

    Controllers.addInitializer(function() {
      new Controllers.PeopleRouter({
        controller: controller
      });
    });

  });
})(this);

