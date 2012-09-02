// a wrapper around Audiolet's `Gain`
// provides:
// - backbone interface
define([
  'lodash',
  '../lib/audiolet',
  '../core/model'
], function(_, Audiolet, Model) {

  var NewPassThroughNode = Model.extend({

    defaults: {
      name: 'Pass Through'
    },

    constructor: function(attrs, options) {

      var self = Model.apply(this, [attrs, options, 1, 1]),
        audiolet = options.audiolet;

      this.node = new PassThroughNode(audiolet, 1, 1);
      this.route();
      
      return self;

    },

    route: function() {
      var node = this.node;
      this.inputs[0].connect(node);
      node.connect(this.outputs[0]);
      return this;
    }

  });

  return NewPassThroughNode;

});