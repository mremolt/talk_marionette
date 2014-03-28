(function(root) {
  'use strict';

  root.App.module('Views', function(Views,  App, Backbone, Marionette) {

    Views.Empty = Marionette.ItemView.extend({
      template: '#view-empty',
      tagName: 'tr'
    });

    Views.NavPeople = Marionette.ItemView.extend({
      template: '#view-nav-people',

      ui: {
        number: '#number-of-people',
        navHome: '.nav-home',
        navNew: '.nav-new',
      },

      events: {
        'click @ui.navHome': 'navigateHome',
        'click @ui.navNew': 'navigateNew',
      },

      bindings: {
        '#number-of-people': 'counter'
      },

      initialize: function() {
        var that = this;
        this.model = new Backbone.Model({ counter: 0 });

        App.vent.on('people:changed', function(people) {
          that.model.set('counter', people.length);
        });

      },

      onRender: function() {
        this.stickit();
      },

      navigateHome: function(e) {
        e.preventDefault();
        App.request('people:index');
      },

      navigateNew: function(e) {
        e.preventDefault();
        App.request('people:new');
      },

    });

    Views.NavSearch = Marionette.ItemView.extend({
      template: '#view-nav-search',

      modelEvents: {
        'change q': 'search'
      },

      bindings: {
        '#input-people-search': 'q'
      },

      initialize: function() {
        this.model = new Backbone.Model({ q: '' });
      },

      onRender: function() {
        this.stickit();
      },

      search: function() {
        this.doSearch(this.model.get('q'));
      },

      doSearch: _.debounce(function(value) {
        App.request('people:search', value);
      }, 200)

    });

    Views.NavContent = Marionette.ItemView.extend({
      template: '#view-nav-content'
    });


    Views.Person = Marionette.ItemView.extend({
      template: '#view-person',
      tagName: 'tr',

      events: {
        'click .delete-me': 'delete',
        'click': 'showDetail'
      },

      delete: function(event) {
        // general click on whole tr
        event.stopPropagation();
        this.model.destroy();
      },

      showDetail: function() {
        App.request('people:show', this.model);
      }

    });

    Views.People = Marionette.CompositeView.extend({
      template: '#view-people',
      itemView: Views.Person,
      itemViewContainer: '#people-list',
      emptyView: Views.Empty
    });

    Views.PersonDetail = Marionette.ItemView.extend({
      template: '#view-person-detail',
      tagName: 'ul'
    });


    Views.PersonNew = Marionette.ItemView.extend({
      template: '#view-person-new',

      events: {
        'submit form': 'submitForm'
      },

      ui: {
        firstName: '#form-person-first-name',
        lastName: '#form-person-last-name',
        email: '#form-person-email'
      },

      bindings: {
        '#form-person-first-name': 'firstName',
        '#form-person-last-name':  'lastName',
        '#form-person-email':      'email'
      },

      initialize: function() {
        this.model = new App.Models.Person();
        // for demo of binding
        window.model = this.model;
      },

      onRender: function() {
        this.stickit();
        this.bindValidation();
      },

      onValidField: function(attrName) {
        var element = this.ui[attrName];
        element.removeClass('error');
        element.parent().find('small.error').remove();
      },

      onInvalidField: function(attrName, attrValue, model) {
        var element = this.ui[attrName];
        var message = $('<small></small>');
        element.parent().find('small.error').remove();

        message.text(model);
        message.addClass('error');
        element.addClass('error');
        element.parent().append(message);
      },

      submitForm: function(event) {
        var that = this,
          collection = new App.Models.People();

        event.preventDefault();
        event.stopPropagation();

        if (this.model.isValid()) {
          collection.create(this.model);
          App.request('people:index');
        } else {
          this.model.on('change', function() {
            that.model.validate();
          });
        }
      }
    });

  });
})(this);
