define([
  '../core/node'
], function(Node) {

  var WhiteNoise = Node.extend({

    defaults: {
      numInputs: 0,
      numOutputs: 1
    },

    generate: function() {

      var self = this,
        sampleRate = 44100,
        output = this.outputs.at(0),
        frequency = this.get('frequency'),
        phase = self.phase,
        nextPhase = phase + (frequency / sampleRate),
        noise = Math.random() * 2 - 1;

      output.send([
        noise,
        noise
      ]);

      return self;

    }

  });

  return WhiteNoise;

});