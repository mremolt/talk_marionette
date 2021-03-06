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

      initialize: function() {
        var that = this;
        this.model = new Backbone.Model({ counter: 0 });
        this._modelBinder = new Backbone.ModelBinder();

        App.vent.on('people:changed', function(people) {
          that.model.set('counter', people.length);
        });

      },

      onRender: function() {
        this._modelBinder.bind(this.model, this.el, null, { boundAttribute: 'data-attr' });
      },

      onClose: function() {
        this._modelBinder.unbind();
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

      initialize: function() {
        this.model = new Backbone.Model({ q: '' });
        this._modelBinder = new Backbone.ModelBinder();
      },

      onRender: function() {
        this._modelBinder.bind(this.model, this.el, null, {
          boundAttribute: 'data-attr',
          changeTriggers: { '': 'change keyup' }
        });
      },

      onClose: function() {
        this._modelBinder.unbind();
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

      onRender: function() {
        this._modelBinder = new Backbone.ModelBinder();
        this._modelBinder.bind(this.model, this.el, null, { boundAttribute: 'data-attr' });
      },

      onClose: function() {
        this._modelBinder.unbind();
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
      tagName: 'ul',

      onRender: function() {
        this._modelBinder = new Backbone.ModelBinder();
        this._modelBinder.bind(this.model, this.el, null, { boundAttribute: 'data-attr' });
      },

      onClose: function() {
        this._modelBinder.unbind();
      }

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

      initialize: function() {
        this.model = new App.Models.Person();
        this._modelBinder = new Backbone.ModelBinder();
        // for demo of binding
        window.model = this.model;
      },

      onRender: function() {
        this.bindValidation();
        this._modelBinder.bind(this.model, this.el, null, {
          boundAttribute: 'data-attr',
          changeTriggers: { '': 'change keyup' }
        });
      },

      onClose: function() {
        this._modelBinder.unbind();
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
