// a simple 2 channel mixer
define([
  'lodash',
  'rhythm/core/model',
  'rhythm/dsp/cross-fader',
  'rhythm/modules/track',
], function(_, Model, CrossFader, Track) {

  var Mixer = Model.extend({

    defaults: {
      position: 0.5,
      tracks: 2
    },

    constructor: function(attrs, options) {

      var tracks = attrs.tracks || Mixer.prototype.defaults.tracks,
        self = Model.apply(this, [attrs, options, tracks, 1]),
        audiolet = options.audiolet,
        position = this.get('position');

      this.tracks = _.map(new Array(tracks), function(v, i) {
        return new Track({ }, { audiolet: audiolet });
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

      _(this.tracks).each(function(track, i) {
        self.inputs[i].connect(track);
        track.connect(crossFader, 0, i);
      });

      crossFader.connect(this.outputs[0]);

      return this;

    }

  });

  return Mixer;

});