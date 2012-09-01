// a wrapper around Audiolet's `LinearCrossFader`
// provides:
// - backbone interface
define([
  'lodash',
  '../lib/audiolet',
  '../core/model'
], function(_, Audiolet, Model) {

  var CrossFader = Model.extend({

    defaults: {
      position: 0.5
    },

    constructor: function(attrs, options) {

      var self = Model.apply(this, [attrs, options, 2, 1]),
        audiolet = options.audiolet,
        position = self.get('position');

      this.crossFader = new LinearCrossFade(audiolet, position);
      self.bindProperties();
      self.route();

      return self;

    },

    bindProperties: function() {

      this.on('change:position', function(self, position) {
        self.crossFader.position.setValue(position);
      });

      return this;
      
    },

    route: function() {
      var crossFader = this.crossFader;
      this.inputs[0].connect(crossFader, 0, 0);
      this.inputs[1].connect(crossFader, 0, 1);
      crossFader.connect(this.outputs[0]);
      return this;
    }

  });

  return CrossFader;

});