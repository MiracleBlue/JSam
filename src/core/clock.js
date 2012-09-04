define([
  '../lib/underscore',
  '../lib/sink',
  '../lib/backbone'
], function(_, Sink, Backbone) {

  var Clock = Backbone.Model.extend({

    defaults: {
      bpm: 120,
      beatInBar: 0,
      bar: 0,
      beatsPerBar: 4,
      beat: 0,
      quantize: false
    },

    beatLength: 0,
    lastBeatTime: 0,
    seconds: 0,
    time: 0,
    queue: null,

    initialize: function() {
      Backbone.Model.prototype.initialize.apply(this, arguments)

      this.sink = Sink(_.bind(this.tick, this), 2, 4096, 44100);

      this.queue = [];

      this.on('change:bpm', function(self, bpm) {
        self.beatLength = 60 / bpm * self.sink.sampleRate;
      });

      this.beatLength = 60 / this.get('bpm') * this.sink.sampleRate;

    },

    play: function(callback, beats_from_now) {
      this.queue.push({
        callback: callback,
        time: this.time + (beats_from_now || 0)
      });
    },

    tick: function(buffer, numChannels) {

      var samplesPerChannel = buffer.length / numChannels;

      var process_events = _.bind(function process_events() {
        for (var j = 0; j < this.queue.length; j++) {
          if (this.queue[j].time < this.time) {
            this.queue[j].callback();
            this.queue.splice(j, 1);
          }
        }
      }, this);

      for (var i = 0; i < samplesPerChannel; i++) {

        this.time += 1;

        // process events on a sampleRate basis
        // if we don't want quantization
        if (!this.get('quantize')) {
          process_events();
        }

        // advance time/beat properties
        this.seconds = this.time / this.sink.sampleRate;
        if (this.time >= this.lastBeatTime + this.beatLength) {
          // if `quantize` is true
          // we process events on every beat
          if (this.get('quantize')) {
            process_events();
          }
          this.lastBeatTime += this.beatLength;
          this.set('beat', this.get('beat') + 1);
          this.set('beatInBar', this.get('beatInBar') + 1);
          if (this.get('beatInBar') == this.get('beatsPerBar')) {
            this.set('bar', this.get('bar') + 1);
            this.set('beatInBar', 0);
          }
        }

      };  

      this.trigger('tick', buffer, numChannels, this.sink.sampleRate);

    }

  });

  return window.c = new Clock();

});