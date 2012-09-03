define([
  '../core/node'
], function(Node) {

  var half_pi = Math.PI / 2;

  var Pan = Node.extend({

    defaults: {
      numInputs: 2,
      numOutputs: 1,
      position: 0.5
    },

    initialize: function() {
      Node.prototype.initialize.apply(this, arguments);
      this.bindInput(1, 'position');
    },

    generate: function(sampleRate) {

      var input = this.inputs.at(0);
      input.connectedFrom.collection.node.generate(sampleRate);

      var input2 = this.inputs.at(1);
      input2.connectedFrom && input2.connectedFrom.collection.node.generate(sampleRate);

      var output = this.outputs.at(0),
        samples = input.samples,
        position = this.get('position'),
        scaledPosition = position * half_pi,
        val = samples[0];

      output.send([
        val * Math.cos(scaledPosition),
        val * Math.sin(scaledPosition)
      ]);

    }

  });

  return Pan;

});