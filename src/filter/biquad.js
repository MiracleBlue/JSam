define([
  '../core/node'
], function(Node) {

  var AllPass = Node.extend({

    defaults: {
      numInputs: 1,
      numOutputs: 1,
      frequency: 22100
    },

    last_frequency: null,

    a0: 0,
    a1: 0,
    a2: 0,
    b0: 0,
    b1: 0,
    b2: 0,

    generate: function(sampleRate) {

      var input = this.inputs.at(0);
      input.connectedFrom.collection.node.generate(sampleRate);

      var self = this,
        samples = input.samples,
        output_samples = [],
        frequency = self.get('frequency'),
        last_frequency = self.last_frequency,
        output = self.outputs.at(0),
        x_values = [],
        y_values = [],
        a0 = self.a0,
        a1 = self.a1,
        a2 = self.a2,
        b0 = self.b0,
        b1 = self.b1,
        b2 = self.b2;

      if (frequency != last_frequency) {
        self.calculate(frequency, sampleRate);
        self.last_frequency = frequency;
      }

      for (var i = 0; i < samples.length; i++) {

        if (i >= x_values.length) {
          x_values.push([0, 0]);
          y_values.push([0, 0]);
        }

        var xs = x_values[i],
          ys = y_values[i],
          x0 = samples[i],
          x1 = xs[0],
          x2 = xs[1],
          y1 = ys[0],
          y2 = ys[1];

        var y0 = (b0 / a0) * x0 +
                 (b1 / a0) * x1 +
                 (b2 / a0) * x2 -
                 (a1 / a0) * y1 -
                 (a2 / a0) * y2;

        samples[i] = y0 || 0;

        xs[0] = x0;
        xs[1] = x1;
        ys[0] = y0;
        ys[1] = y1;

      }

      if (Math.floor(Math.random() * 10000) == 5) {
        console.log(samples);
      }

      output.send(samples);

    },

    calculate: function() {

    }

  });

  return AllPass;

});