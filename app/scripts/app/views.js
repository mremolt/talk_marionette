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

        App.vent.on('people:changed', function(people) {
          that.setNumber(people);
        });

      },

      setNumber: function(collection) {
        this.ui.number.text(collection.length);
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

      ui: {
        search: '#input-people-search'
      },

      events: {
        'keyup @ui.search': 'search'
      },

      search: function() {
        this.doSearch(this.ui.search.val());
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
      },

      submitForm: function(event) {
        var collection = new App.Models.People();

        event.preventDefault();
        event.stopPropagation();

        if (this.model.isValid()) {
          collection.create(this.model);
          App.request('people:index');
        } else {
          alert('Form is not valid, please fix!');
        }
      }
    });

  });
})(this);
