define([
  '../core/node'
], function(Node) {

  var half_pi = Math.PI / 2;

  var CrossFader = Node.extend({

    defaults: {
      numInputs: 3,
      numOutputs: 1,
      position: 0.5
    },

    initialize: function() {
      Node.prototype.initialize.apply(this, arguments);
      this.bindInput(2, 'position');
    },

    generate: function(sampleRate) {

      var input_a = this.inputs.at(0);
      input_a.connectedFrom.collection.node.generate(sampleRate);

      var input_b = this.inputs.at(1);
      input_b.connectedFrom.collection.node.generate(sampleRate);

      var input_c = this.inputs.at(2);
      input_c.connectedFrom && input_c.connectedFrom.collection.node.generate(sampleRate);

      var output = this.outputs.at(0),
        output_samples = [],
        samples_a = input_a.samples,
        samples_b = input_b.samples,
        position = this.get('position'),
        scaled_position = position * half_pi,
        gain_a = Math.cos(scaled_position),
        gain_b = Math.sin(scaled_position);

      for (var i = 0; i < samples_a.length; i++) {
        var val_a = samples_a[i] || 0,
          val_b = samples_b[i] || 0;
        output_samples.push(val_a * gain_a + val_b * gain_b);
      }

      output.send(output_samples);

    }

  });

  return CrossFader;

});