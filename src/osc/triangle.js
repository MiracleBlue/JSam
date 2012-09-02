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

    generate: function() {

      var self = this,
        sampleRate = 44100,
        output = this.outputs.at(0),
        frequency = this.get('frequency'),
        phase = self.phase,
        nextPhase = phase + (frequency / sampleRate),
        triangle = 1 - 4 * Math.abs((phase + 0.25) % 1 - 0.5);

      output.send([
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