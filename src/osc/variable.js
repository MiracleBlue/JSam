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
      frequency: 440,
      width: 0.5
    },

    phase: 0,

    initialize: function() {
      Node.prototype.initialize.apply(this, arguments);

      var self = this,
        shape = this.get('shape');

      function bind_generator(Node) {
        self.generate = _.bind(Node.prototype.generate, self);
      }

      this.on('change:shape', function(self, shape) {
        bind_generator(oscillators[shape]);
      });

      bind_generator(oscillators[shape]);

    }

  });

  return Variable;

});