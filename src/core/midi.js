define([
  './node'
], function(Node) {

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

    midi: function(channel, key, velocity) {
      var method = this[channels[channel]];
      method(key, velocity);
    },

    noteOn: function(key, velocity) {
    },

    noteOff: function(key, velocity) {
    }

  });

  return Midi;

});