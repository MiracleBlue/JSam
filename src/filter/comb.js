define([
  '../core/node'
], function(Node) {

  var Comb = Node.extend({

    defaults: {
      numInputs: 4,
      numOutputs: 1,
      maxDelay: 1,
      delay: 1,
      decay: 0
    },

    buffers: null,
    readWriteIndex: 0,

    initialize: function() {
      Node.prototype.initialize.apply(this, arguments);
      this.buffers = [];
      this.bindInput(1, 'maxDelay');
      this.bindInput(2, 'delay');
      this.bindInput(3, 'decay');
    },

    generate: function(sampleRate) {

      var input1 = this.inputs.at(0);
      input1.connectedFrom.collection.node.generate(sampleRate);

      var input2 = this.inputs.at(1);
      input2.connectedFrom && input2.connectedFrom.collection.node.generate(sampleRate);

      var input3 = this.inputs.at(2);
      input3.connectedFrom && input3.connectedFrom.collection.node.generate(sampleRate);

      var input4 = this.inputs.at(3);
      input4.connectedFrom && input4.connectedFrom.collection.node.generate(sampleRate);

      var self = this,
        samples = input1.samples,
        output_samples = [],
        output = self.outputs.at(0),
        delayTime = this.get('delay') * sampleRate,
        decayTime = this.get('decay') * sampleRate,
        feedback = Math.exp(-3 * delayTime / decayTime);

      for (var i = 0; i < samples.length; i++) {

        if (i >= this.buffers.length) {
          var bufferSize = this.get('maxDelay') * sampleRate;
          this.buffers.push(new Float32Array(bufferSize));
        }

        var buffer = this.buffers[i],
          outputVal = buffer[this.readWriteIndex];

        output_samples.push(outputVal);
        buffer[this.readWriteIndex] = samples[i] + feedback * outputVal;

      }

      this.readWriteIndex += 1;
      if (this.readWriteIndex >= delayTime) {
        this.readWriteIndex = 0;
      }

      output.send(output_samples);

    }

  });

  return Comb;

});