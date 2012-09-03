define([
  '../core/node'
], function(Node) {

  var DampedComb = Node.extend({

    defaults: {
      numInputs: 2,
      numOutputs: 1,
      coefficient: 0.995
    },

    x_values: null,
    y_values: null,

    initialize: function() {
      Node.prototype.initialize.apply(this, arguments);
      this.x_values = [];
      this.y_values = [];
      this.bindInput(1, 'coefficient');
    },

    generate: function(sampleRate) {

      var input1 = this.inputs.at(0);
      input1.connectedFrom.collection.node.generate(sampleRate);

      var input2 = this.inputs.at(1);
      input2.connectedFrom && input2.connectedFrom.collection.node.generate(sampleRate);

      var self = this,
        samples = input1.samples,
        output_samples = [],
        output = self.outputs.at(0),
        x_values = this.x_values,
        y_values = this.y_values,
        coefficient = this.get('coefficient');

      for (var i = 0; i < samples.length; i++) {

        if (i >= this.x_values.length) {
          this.x_values.push(0);
        }

        if (i >= this.y_values.length) {
          this.y_values.push(0);
        }

        var x0 = input1.samples[i],
          y0 = x0 - this.x_values[i] + coefficient * this.y_values[i];

        output_samples.push(y0);

        this.x_values[i] = x0;
        this.y_values[i] = y0;

      }

      output.send(output_samples);

    }

  });

  return DampedComb;

});