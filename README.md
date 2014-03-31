# TOC

## Project setup

* yeoman + webapp
* bower
* zurb foundation css
* app.js
* app/utils.js
* app/models.js
* app/layouts.js
* app/views.js
* app/controllers.js
* templates (index.html)


## Vendor

* Marionette (+ Backbone, jQuery, Underscore)
* bsckbone.localstorage
* backbone.modelbinder
* backbone.validator


## Marionette Application

* Initializer
* Events (App.vent)
* Regions


## Marionette Module

* Namespaces
* Vendor import
* can combine with AMD (not in this project)


## Backbone Models & Collections

* Models
* Collections


## Marionette Controller & Router

* Router (just on init page load)
* Controller
* Marionette Request/Response


## Marionette Views

* Layouts
* ItemView
* CollectionView
* CompositeViewView
* emptyView
* view events (onRender, onShow, onClose ...)
* model/collectionEvents
* ui


## Specials

* localStorage
* Live model binding
* Form validation


## Lessons learned

* write a lot! of small Views (no loops in template!)
* use vent/reqres to connect parts of the app
* routing is just for bookmarking/deeplinks


# Comparing with Ember/Angular

## The good

* little to no magic (far less WTF/sec)
* a few sensible naming conventions
* everything is there to override and configure (different templating, 3 lines
  of JS)
* the framework does not stand in your way
* healthy plugin ecosystem
* powerful models compared to Angular
* excellent project modularization/structure


## The bad

* you gonna write more code than using Angular or especially Ember
* advanced features (live binding, model relations, directives ...) are only available
  via plugins or not at all
* very OO centric (imho. JS works better with a functional style) +Angular,
  -Ember
* weak models compared to Ember







