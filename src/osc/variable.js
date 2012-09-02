define([
  '../lib/underscore',
  '../core/node',
  './pulse',
  './saw',
  './sine',
  './square',
  './triangle',
  './white-noise'
], function(_, Node, Pulse, Saw, Sine, Square, Triangle, WhiteNoise) {

  var oscillators = {
    'pulse': Pulse,
    'saw': Saw,
    'sine': Sine,
    'square': Square,
    'triangle': Triangle,
    'white-noise': WhiteNoise
  };

  var Variable = Node.extend({

    defaults: {
      numInputs: 0,
      numOutputs: 1,
      shape: 'sine',
      frequency: 440
    },

    phase: 0,

    initialize: function() {

      var shape = this.get('shape');

      Node.prototype.initialize.apply(this, arguments);

      this.on('change:shape', function(self, shape) {
        self.generate = _.bind(oscillators[shape].prototype.generate, self);
      });

      this.generate = _.bind(oscillators[shape].prototype.generate, this);

    }

  });

  return Variable;

});