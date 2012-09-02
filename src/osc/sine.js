define([
  '../core/node'
], function(Node) {

  var two_pi = 2 * Math.PI;

  var Sine = Node.extend({

    defaults: {
      numInputs: 0,
      numOutputs: 1,
      frequency: 440
    },

    phase: 0,

    generate: function(sampleRate) {

      var self = this,
        frequency = this.get('frequency'),
        phase = self.phase,
        nextPhase = phase + (two_pi * frequency / sampleRate),
        sine = Math.sin(phase);

      this.outputs.at(0).send([
        sine,
        sine
      ]);

      if (nextPhase > two_pi) {
        self.phase = nextPhase % two_pi;

      } else {
        self.phase = nextPhase;
      }

      return self;

    }

  });

  return Sine;

});