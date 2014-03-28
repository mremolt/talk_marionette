(function(root) {
  'use strict';

  root.App.module('Models', function(Models, App, Backbone) {

    Models.Person = Backbone.Model.extend({
      defaults: {
        'firstName': '',
        'lastName': '',
        'email': ''
      },

      validation: {
        firstName: {
          blank: false,
          message: 'First name is required.'
        },
        lastName: {
          blank: false,
          message: 'Last name is required.'
        },
        email: {
          required: true,
          format: 'email',
          message: 'Does not match format'
        }
      },

      match: function(q) {
        q = q.toLowerCase();
        return this.get('firstName').toLowerCase().indexOf(q) !== -1 ||
          this.get('lastName').toLowerCase().indexOf(q) !== -1 ||
          this.get('email').toLowerCase().indexOf(q) !== -1;
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
