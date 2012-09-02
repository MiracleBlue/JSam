define([
  '../core/node'
], function(Node) {

  var Pulse = Node.extend({

    defaults: {
      numInputs: 0,
      numOutputs: 1,
      frequency: 440,
      width: 0.5
    },

    phase: 0,

    generate: function() {

      var self = this,
        sampleRate = 44100,
        twoPi = 2 * Math.PI,
        output = this.outputs.at(0),
        frequency = this.get('frequency'),
        phase = self.phase,
        width = this.get('width'),
        nextPhase = phase + (frequency / sampleRate),
        pulse = (phase < width)? 1: -1;

      output.send([
        pulse,
        pulse
      ]);

      if (nextPhase > twoPi) {
        self.phase = nextPhase % twoPi;

      } else {
        self.phase = nextPhase;
      }

      return self;

    }

  });

  return Pulse;

});