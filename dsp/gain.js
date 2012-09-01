// a wrapper around Audiolet's `Gain`
// provides:
// - backbone interface
define([
  'lodash',
  '../lib/audiolet',
  '../core/model'
], function(_, Audiolet, Model) {

  var NewGain = Model.extend({

    defaults: {
      gain: 1
    },

    constructor: function(attrs, options) {

      var self = Model.apply(this, [attrs, options, 1, 1]),
        audiolet = options.audiolet,
        gain = this.get('gain');

      this.gain = new Gain(audiolet, gain);
      this.bindProperties();
      this.route();
      
      return self;

    },

    bindProperties: function() {

      this.on('change:gain', function(self, gain) {
        self.gain.value.setValue(gain);
      });

      return this;

    },

    route: function() {
      var gain = this.gain;
      this.inputs[0].connect(gain);
      gain.connect(this.outputs[0]);
      return this;
    }

  });

  return NewGain;

});