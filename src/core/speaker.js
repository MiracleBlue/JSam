define([
  '../lib/underscore',
  '../lib/sink',
  './node',
  './clock'
], function(_, Sink, Node, clock) {

  var Speaker = Node.extend({

    defaults: {
      numInputs: 1,
      numOutputs: 0
    },

    initialize: function() {
      clock.on('tick', _.bind(this.generate, this));
      return Node.prototype.initialize.apply(this, arguments);
    },

    generate: function(buffer, numChannels, sampleRate) {

      var input = this.inputs.at(0),
        samplesPerChannel = buffer.length / numChannels;

      for (var i = 0; i < samplesPerChannel; i++) {
        input.connectedFrom.collection.node.generate(sampleRate);
        for (var j = 0; j < numChannels; j++) {
          buffer[i * numChannels + j] = input.samples[j];
        }
      };
      
    }

  });

  return Speaker;

});