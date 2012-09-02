define([
  '../lib/backbone',
  './jack'
], function(Backbone, Jack) {

  var Jacks = Backbone.Collection.extend({

    model: Jack,
    node: false,

    initialize: function(models, options) {
      this.node = options.node;
      return Backbone.Collection.prototype.initialize.apply(this, arguments);
    }

  });

  return Jacks;

});