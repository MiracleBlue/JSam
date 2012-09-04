define([
  '../lib/underscore',
  './node'
], function(_, Node) {

  var channels = {
    144: 'noteOn',
    128: 'noteOff'
  };

  var keys = {

  };

  var Midi = Node.extend({

    initialize: function() {
      Node.prototype.initialize.apply(this, arguments);
    },

    midi: function(channel, key, vel) {
      var method = _.bind(this[channels[channel]], this);
      method(channel, key, vel);
    },

    midiOut: function(node) {
      this.on('midi', function(channel, key, vel) {
        node.midi(channel, key, vel);
      });
    },

    noteOn: function(channel, key, vel) {
      this.trigger('midi', channel, key, vel);
    },

    noteOff: function(channel, key, vel) {
      this.trigger('midi', channel, key, vel);
    }

  });

  return Midi;

});