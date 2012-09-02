define([
  '../lib/backbone',
  './jacks'
], function(Backbone, Jacks) {

  var Node = Backbone.Model.extend({

    defaults: {
      numInputs: 1,
      numOutputs: 1
    },

    inputs: null,
    outputs: null,

    initialize: function(attrs) {

      var numInputs = this.get('numInputs'),
        numOutputs = this.get('numOutputs');

      this.inputs = new Jacks([], { node: this });
      this.outputs = new Jacks([], { node: this });

      for (var i = 0; i < numInputs; i++) {
        this.inputs.add({});
      }

      for (var i = 0; i < numOutputs; i++) {
        this.outputs.add({});
      }

      return Backbone.Model.prototype.initialize.apply(this, arguments);

    },

    generate: function() {

      var input = this.inputs.at(0),
        output = this.outputs.at(0),
        samples = input.samples;

      input.connectedFrom.collection.node.generate();
      output.send(samples);

    }

  });

  return Node;

});