define([
  '../core/node'
], function(Node) {

  var Gain = Node.extend({

    defaults: {
      numInputs: 1,
      numOutputs: 1,
      gain: 0.5
    },

    generate: function() {

      var input = this.inputs.at(0);
      input.connectedFrom.collection.node.generate();

      var output = this.outputs.at(0),
        samples = input.samples,
        gain = this.get('gain');

      for (var i = 0; i < samples.length; i++) {
        samples[i] = samples[i] * gain;
      }

      output.send(samples);

    }

  });

  return Gain;

});