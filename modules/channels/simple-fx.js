// a simple channel model:
// input -> (fx, fx, fx) -> gain -> pan -> output
define([
  '../../core/model',
  '../../core/chain',
  '../../dsp/pass-through'
], function(Model, Chain, PassThrough) {

  var SimpleFXChannel = Model.extend({

    defaults: {
      name: 'New Channel',
      gain: 0.7,
      pan: 0.5
    },

    constructor: function(attrs, options) {
      Model.apply(this, [attrs, options, 1, 1]);
    },

    initialize: function(attrs, options) {

      var audiolet = this.audiolet = options.audiolet,
        gain = this.gain = new Gain(audiolet, this.get('gain')),
        pan = this.pan = new Pan(audiolet, this.get('pan')),
        fx1 = new PassThrough({ name: 'FX 1' }, { audiolet: options.audiolet }),
        fx2 = new PassThrough({ name: 'FX 2' }, { audiolet: options.audiolet }),
        fx3 = new PassThrough({ name: 'FX 3' }, { audiolet: options.audiolet }),
        fx = this.fx = new Chain([fx1, fx2, fx3], { audiolet: audiolet });

      this.on('change:gain', function(self, val) {
        gain.gain.setValue(val);
      });

      this.on('change:pan', function(self, val) {
        pan.pan.setValue(val);
      });

      this.route();

    },

    route: function() {

      var input = this.inputs[0],
        pan = this.pan,
        gain = this.gain,
        fx = this.fx,
        output = this.outputs[0];

      input.connect(fx);
      fx.connect(gain);
      gain.connect(pan);
      pan.connect(output);

    }

  });

  return SimpleFXChannel;

});