define([
  '../core/node'
], function(Node) {

  var Square = Node.extend({

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
        nextPhase = phase + (frequency / sampleRate),
        square = nextPhase > 0.5? 1: -1;

      this.outputs.at(0).send([
        square,
        square
      ]);

      if (nextPhase > 1) {
        self.phase = nextPhase % 1;

      } else {
        self.phase = nextPhase;
      }

      return self;

    }

  });

  return Square;

});