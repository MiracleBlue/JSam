define([
  '../core/node'
], function(Node) {

  var Triangle = Node.extend({

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
        triangle = 1 - 4 * Math.abs((phase + 0.25) % 1 - 0.5);

      this.outputs.at(0).send([
        triangle,
        triangle
      ]);

      if (nextPhase > 1) {
        self.phase = nextPhase % 1;

      } else {
        self.phase = nextPhase;
      }

      return self;

    }

  });

  return Triangle;

});