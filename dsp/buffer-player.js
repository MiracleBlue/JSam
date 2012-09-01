// a wrapper around Audiolet's `BufferPlayer`
// provides:
// - backbone model interface
// - live-swapping the buffer
// - setting startPosition and endPosition for looping
define([
  'lodash',
  '../lib/audiolet',
  '../core/model'
], function(_, Audiolet, Model) {

  var NewBufferPlayer = Model.extend({

    defaults: {
      buffer: null,
      tempo: 1,
      playing: false,
      position: 0,
      startPosition: 0,
      endPosition: 0
    },

    constructor: function(attrs, options) {

      var self = Model.apply(this, [attrs, options, 0, 1]),
        audiolet = options.audiolet,
        tempo = self.get('tempo'),
        buffer = self.get('buffer'),
        startPosition = self.get('position'),
        player = this.bufferPlayer = new BufferPlayer(audiolet, buffer, tempo, startPosition, 1);
      
      player.generate = _.bind(this.generate, player);
      player.endPosition = new AudioletParameter(player, null, buffer.length);

      this.set('endPosition', buffer.length);
      this.bindProperties();
      this.route();

      return self;

    },

    bindProperties: function() {

      this.on('change:tempo', function(self, tempo) {
        self.bufferPlayer.playbackRate.setValue(tempo);
      });

      this.on('change:playing', function(self, playing) {
        self.bufferPlayer.playing = playing;
      });

      this.on('change:buffer', function(self, buffer) {
        self.bufferPlayer.buffer = self.get('buffer');
        self.bufferPlayer.setNumberOfOutputChannels(0, self.bufferPlayer.buffer.numberOfChannels);
      });

      this.on('change:startPosition', function(self, position) {
        self.bufferPlayer.startPosition.setValue(position);
      });

      this.on('change:endPosition', function(self, position) {
        self.bufferPlayer.endPosition.setValue(position);
      });
      
      return this;

    },

    route: function() {
      var playing = this.get('playing');
      this.bufferPlayer.playing = playing;
      this.bufferPlayer.connect(this.outputs[0]);
      return this;
    },

    // do a "fake" get for `position` by accessing it directly.
    // this isn't set on the model for performance reasons.
    get: function(attr) {
      if (attr == 'position' && this.bufferPlayer) {
        return this.bufferPlayer.position;
      } else {
        return Backbone.Model.prototype.get.apply(this, arguments);
      }
    },

    // if `position` is set to 0,
    // the model should restart the bufferPlayer
    // this is in `set` and not on bind because it might be triggered
    // as 0 multiple times, and won't trigger change. the reason `position` isn't
    // updated live is for performance reasons.
    set: function(key, value, options) {
      var self = Model.prototype.set.apply(this, arguments),
        position = key == 'position'? value: key['position'];
      if ((position === 0 || position) && this.bufferPlayer) {
        this.bufferPlayer.position = position;
      }
      return self;
    },

    generate: function() {
      var output = this.outputs[0];

      // Cache local variables
      var numberOfChannels = output.samples.length;

      if (this.buffer.length == 0 || !this.playing) {
          // No buffer data, or not playing, so output zeros and return
          for (var i=0; i<numberOfChannels; i++) {
              output.samples[i] = 0;
          }
          return;
      }

      // Crap load of parameters
      var playbackRate = this.playbackRate.getValue();
      var restartTrigger = this.restartTrigger.getValue();
      var startPosition = this.startPosition.getValue();
      var endPosition = this.endPosition.getValue();
      var loop = this.loop.getValue();

      if (restartTrigger > 0 && !this.restartTriggerOn) {
          // Trigger moved from <=0 to >0, so we restart playback from
          // startPosition
          this.position = startPosition;
          this.restartTriggerOn = true;
          this.playing = true;
      }

      if (restartTrigger <= 0 && this.restartTriggerOn) {
          // Trigger moved back to <= 0
          this.restartTriggerOn = false;
      }

      var numberOfChannels = this.buffer.channels.length;

      for (var i = 0; i < numberOfChannels; i++) {
          var inputChannel = this.buffer.getChannelData(i);
          output.samples[i] = inputChannel[Math.floor(this.position)];
      }
      
      this.position += playbackRate;

      if (this.position >= endPosition) {
          if (loop) {
              // Back to the start
              this.position = startPosition + (this.position % this.buffer.length);
          }
          else {
              // Finish playing until a new restart trigger
              this.playing = false;
              if (this.onComplete) {
                 this.onComplete();
              }
          }
      }
    }

  });

  return NewBufferPlayer;

});