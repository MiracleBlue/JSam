// a simple channel model:
// input -> pan -> gain -> filter -> output
define([
  'lodash',
  '../../core/model',
  '../../dsp/pan',
  '../../dsp/gain',
  '../../dsp/high-pass-filter'
], function(_, Model, Pan, Gain, HighPassFilter) {

  var SimpleFilteredChannel = Model.extend({

    defaults: {
      pan: 0.5,
      gain: 0.5,
      filter: 1
    },

    constructor: function(attrs, options) {

      var self = Model.apply(this, [attrs, options, 1, 1]),
        audiolet = options.audiolet,
        gain = this.get('gain'),
        pan = this.get('pan'),
        filter = this.get('filter');

      this.pan = new Pan({ pan: pan }, { audiolet: audiolet });
      this.gain = new Gain({ gain: gain }, { audiolet: audiolet });
      this.filter = new HighPassFilter({ frequency: filter }, { audiolet: audiolet });

      this.bindProperties();
      this.route();

      return self;

    },

    bindProperties: function() {

      this.on('change:pan', function(self, pan) {
        self.pan.set('pan', pan);
      });

      this.on('change:gain', function(self, gain) {
        self.gain.set('gain', gain);
      });

      this.on('change:filter', function(self, frequency) {
        self.filter.set('frequency', frequency);
      });

      return this;

    },

    route: function() {
      this.inputs[0].connect(this.pan);
      this.pan.connect(this.gain);
      this.gain.connect(this.filter);
      this.filter.connect(this.outputs[0]);
    }

  });

  return SimpleFilteredChannel;

});