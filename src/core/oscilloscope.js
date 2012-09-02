define([
  '../lib/underscore',
  '../lib/backbone',
  './node'
], function(_, Backbone, Node) {

  var View = Backbone.View.extend({

    tagName: 'canvas',

    attributes: {
      width: 200,
      height: 50
    },

    initialize: function() {
      this.y_coordinates = [];
      webkitRequestAnimationFrame(_.bind(this.render, this));
      Backbone.View.prototype.initialize.apply(this, arguments);
    },

    render: function() {

      var self = Backbone.View.prototype.render.apply(this, arguments),
        y_coordinates = this.y_coordinates,
        input = this.model,
        samples = input.samples,
        context = self.$el.get(0).getContext('2d'),
        height = this.attributes.height,
        width = this.attributes.width,
        half = height / 2,
        normalized_y = samples? (samples[0] * half): 0;

      y_coordinates.push(half + normalized_y);
      if (y_coordinates.length > width) {
        y_coordinates.shift();
      }

      context.fillStyle = 'rgb(80, 80, 80)';
      context.strokeStyle = 'rgb(75, 200, 120)';
      context.fillRect(0, 0, width, height);
      context.beginPath();

      for (var x = 0; x < y_coordinates.length; x++) {
        context.moveTo(x - 1, y_coordinates[x]);
        context.lineTo(x, y_coordinates[x]);
        context.stroke();
      }

      webkitRequestAnimationFrame(_.bind(this.render, this));
      return self;

    }

  });

  var Oscilloscope = Node.extend({

    defaults: {
      numInputs: 1,
      numOutputs: 1
    },

    initialize: function() {
      Node.prototype.initialize.apply(this, arguments)
      this.view = new View({ model: this.inputs.at(0) });
    }

  });

  return Oscilloscope;

});