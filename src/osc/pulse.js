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

    generate: function(sampleRate) {

      var self = this,
        frequency = this.get('frequency'),
        width = this.get('width'),
        phase = self.phase,
        nextPhase = phase + (frequency / sampleRate),
        pulse = (phase < width)? 1: -1;

      this.outputs.at(0).send([
        pulse,
        pulse
      ]);

      if (nextPhase > 1) {
        self.phase = nextPhase % 1;

      } else {
        self.phase = nextPhase;
      }

      return self;

    }

  });

  return Pulse;

});