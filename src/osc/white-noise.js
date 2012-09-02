define([
  '../core/node'
], function(Node) {

  var WhiteNoise = Node.extend({

    defaults: {
      numInputs: 0,
      numOutputs: 1
    },

    generate: function(sampleRate) {

      var self = this,
        noise = Math.random() * 2 - 1;

      this.outputs.at(0).send([
        noise,
        noise
      ]);

      return self;

    }

  });

  return WhiteNoise;

});