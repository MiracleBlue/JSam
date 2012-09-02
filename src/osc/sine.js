define([
  '../core/node'
], function(Node) {

  var Sine = Node.extend({

    defaults: {
      numInputs: 0,
      numOutputs: 1,
      frequency: 440
    },

    phase: 0,

    generate: function() {

      var self = this,
        sampleRate = 44100,
        twoPi = 2 * Math.PI,
        output = this.outputs.at(0),
        frequency = this.get('frequency'),
        phase = self.phase,
        nextPhase = phase + (twoPi * frequency / sampleRate),
        sine = Math.sin(phase);

      output.send([
        sine,
        sine
      ]);

      if (nextPhase > twoPi) {
        self.phase = nextPhase % twoPi;

      } else {
        self.phase = nextPhase;
      }

      return self;

    }

  });

  return Sine;

});