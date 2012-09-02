define([
  '../core/node'
], function(Node) {

  var Saw = Node.extend({

    defaults: {
      numInputs: 0,
      numOutputs: 1,
      frequency: 440
    },

    phase: 0,

    generate: function() {

      var self = this,
        sampleRate = 44100,
        output = this.outputs.at(0),
        frequency = this.get('frequency'),
        phase = self.phase,
        nextPhase = phase + (frequency / sampleRate),
        saw = ((nextPhase / 2 + 0.25) % 0.5 - 0.25) * 4;

      output.send([
        saw,
        saw
      ]);

      if (nextPhase > 1) {
        self.phase = nextPhase % 1;

      } else {
        self.phase = nextPhase;
      }

      return self;

    }

  });

  return Saw;

});