// a wrapper around Audiolet's `Gain`
// provides:
// - backbone interface
define([
  'lodash',
  '../lib/audiolet',
  '../core/model'
], function(_, Audiolet, Model) {

  var NewPan = Model.extend({

    defaults: {
      pan: 0.5
    },

    constructor: function(attrs, options) {

      var self = Model.apply(this, [attrs, options, 1, 1]),
        audiolet = options.audiolet,
        pan = this.get('pan');

      this.pan = new Pan(audiolet, pan);
      this.bindProperties();
      this.route();
      
      return self;

    },

    bindProperties: function() {

      this.on('change:pan', function(self, pan) {
        self.pan.pan.setValue(pan);
      });

      return this;

    },

    route: function() {
      var pan = this.pan;
      this.inputs[0].connect(pan);
      pan.connect(this.outputs[0]);
      return this;
    }

  });

  return NewPan;

});