define([
  '../lib/backbone',
  './jacks'
], function(Backbone, Jacks) {

  var Node = Backbone.Model.extend({

    defaults: {
      numInputs: 1,
      numOutputs: 1,
      bypass: false
    },

    inputs: null,
    outputs: null,
    parameterInputs: null,

    initialize: function(attrs) {

      var numInputs = this.get('numInputs'),
        numOutputs = this.get('numOutputs');

      this.inputs = new Jacks([], { node: this });
      this.outputs = new Jacks([], { node: this });
      this.parameterInputs = {};

      for (var i = 0; i < numInputs; i++) {
        this.inputs.add({});
      }

      for (var i = 0; i < numOutputs; i++) {
        this.outputs.add({});
      }

      return Backbone.Model.prototype.initialize.apply(this, arguments);

    },

    generate: function(sampleRate) {

      var input = this.inputs.at(0);
      input.connectedFrom.collection.node.generate(sampleRate);

      var output = this.outputs.at(0),
        samples = input.samples;

      output.send(samples);

    },

    bindInput: function(index, attr) {
      this.parameterInputs[attr] = this.inputs.at(index);
    },

    get: function(attr) {
      var val,
        params = this.parameterInputs,
        input = params && params[attr];
      if (input && input.samples) {
        var signal = input.samples[0];
        val = (signal + 1) / 2;
      } else {
        val = this.attributes[attr];
      }
      return val;
    },  

  });

  return Node;

});