define([
  '../lib/zepto',
  '../lib/underscore',
  '../core/midi'
], function($, _, Midi) {

  var Arpeggiator = Midi.extend({

    defaults: {
      numInputs: 0,
      numOutputs: 0
    },

    noteOn: function(channel, key, vel) {

      var self = this;
      self.trigger('midi', channel, key, vel);

      this.play(function() {
        self.trigger('midi', 128, key, vel);
        self.trigger('midi', channel, key + 2, vel);
      }, 22050 * .2);

      this.play(function() {
        self.trigger('midi', 128, key + 2, vel);
        self.trigger('midi', channel, key + 4, vel);
      }, 22050 * .4);

      this.play(function() {
        self.trigger('midi', 128, key + 4, vel);
        self.trigger('midi', channel, key + 6, vel);
      }, 22050 * .6);

      this.play(function() {
        self.trigger('midi', 128, key + 6, vel);
        self.trigger('midi', channel, key + 8, vel);
      }, 22050 * .8);

      this.play(function() {
        self.trigger('midi', 128, key + 8, vel);
      }, 22050 * 1);
      
    }

  });

  return Arpeggiator;

});