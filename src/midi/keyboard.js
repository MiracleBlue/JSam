define([
  '../lib/zepto',
  '../lib/underscore',
  '../core/midi'
], function($, _, Midi) {

  var $doc = $(document);

  var event_to_midi = {
    65: 64,
    87: 65,
    83: 67,
    69: 68,
    68: 69,
    82: 70,
    70: 71,
    71: 72,
    89: 73,
    72: 74,
    85: 75,
    74: 76,
    75: 78,
    79: 79,
    76: 80,
    80: 81
  };

  var MidiKeyboard = Midi.extend({

    defaults: {
      numInputs: 0,
      numOutputs: 0
    },

    pressed: null,

    initialize: function() {
      var self = this;
      Midi.prototype.initialize.apply(this, arguments);
      this.pressed = {};
      $doc.on('keydown', _.bind(this.tryNoteOn, this));
      $doc.on('keyup', _.bind(this.tryNoteOff, this));
    },

    tryNoteOn: function(e) {
      var eventKey = e.which,
        midiKey = event_to_midi[eventKey];
      if (!this.pressed[eventKey] && midiKey) {
        this.pressed[eventKey] = true;
        this.trigger('midi', 144, midiKey, 10);
      }
    },

    tryNoteOff: function(e) {
      var eventKey = e.which,
        midiKey = event_to_midi[eventKey];
      if (this.pressed[eventKey] && midiKey) {
        this.pressed[eventKey] = false;
        this.trigger('midi', 128, midiKey, 10);
      }
    }

  });

  return MidiKeyboard;

});