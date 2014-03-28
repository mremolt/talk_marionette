(function(root) {
  'use strict';

  root.App.module('Models', function(Models, App, Backbone) {

    Models.Person = Backbone.Model.extend({
      defaults: {
        'firstName': '',
        'lastName': '',
        'email': ''
      },

      validate: function() {
        // sample validation
        if (! this.get('email') ) {
          return 'Please fill out email!';
        }
      },

      match: function(q) {
        return this.get('firstName').indexOf(q) !== -1 ||
          this.get('lastName').indexOf(q) !== -1 ||
          this.get('email').indexOf(q) !== -1;
      }
    });


    Models.People = Backbone.Collection.extend({
      localStorage: new Backbone.LocalStorage('AppPeople'),
      model: Models.Person,

      initialize: function() {
        var that = this;
        this.on('add remove reset sync', function() {
          App.vent.trigger('people:changed', that);
        });
      }
    });

  });
})(this);
