define([
  '../lib/underscore',
  '../lib/sink',
  './node'
], function(_, Sink, Node) {

  var Speaker = Node.extend({

    defaults: {
      numInputs: 1,
      numOutputs: 0
    },

    initialize: function() {
      this.sink = Sink(_.bind(this.generate, this));
      return Node.prototype.initialize.apply(this, arguments);
    },

    generate: function(buffer, numChannels) {

      var input = this.inputs.at(0),
        samplesPerChannel = buffer.length / numChannels;

      for (var i = 0; i < samplesPerChannel; i++) {
        input.connectedFrom.collection.node.generate();
        for (var j = 0; j < numChannels; j++) {
          buffer[i * numChannels + j] = input.samples[j];
        }
      };
      
    }

  });

  return Speaker;

});