// a simple 2 channel mixer
define([
  'lodash',
  '../../core/model',
  '../../dsp/cross-fader',
  '../channels/simple-filtered',
], function(_, Model, CrossFader, Channel) {

  var TwoDeckMixer = Model.extend({

    defaults: {
      position: 0.5,
      channels: 2
    },

    constructor: function(attrs, options) {

      var channels = attrs.channels || Mixer.prototype.defaults.channels,
        self = Model.apply(this, [attrs, options, channels, 1]),
        audiolet = options.audiolet,
        position = this.get('position');

      this.channels = _.map(new Array(channels), function(v, i) {
        return new Channel({ }, { audiolet: audiolet });
      });

      this.crossFader = new CrossFader({ position: position }, { audiolet: options.audiolet });
      this.bindProperties();
      this.route();

      return this;

    },

    bindProperties: function() {
      
      this.on('change:position', function(self, position) {
        self.crossFader.set('position', position);
      });

      return this;

    },

    route: function() {

      var self = this,
        crossFader = this.crossFader;

      _(this.channels).each(function(channel, i) {
        self.inputs[i].connect(channel);
        channel.connect(crossFader, 0, i);
      });

      crossFader.connect(this.outputs[0]);

      return this;

    }

  });

  return TwoDeckMixer;

});