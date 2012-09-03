define([
  '../core/node'
], function(Node) {

  var Gain = Node.extend({

    defaults: {
      numInputs: 2,
      numOutputs: 1,
      level: 1
    },

    generate: function(sampleRate) {

      var input = this.inputs.at(0);
      input.connectedFrom.collection.node.generate(sampleRate);

      var input2 = this.inputs.at(1);
      input2.connectedFrom.collection.node.generate(sampleRate);

      var output = this.outputs.at(0),
        output_samples = [],
        samples = input.samples,
        level = input2.samples[0] || this.get('level');

      for (var i = 0; i < samples.length; i++) {
        output_samples.push(samples[i] * level);
      }

      output.send(output_samples);

    }

  });

  return Gain;

});