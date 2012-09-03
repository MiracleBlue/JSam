define([
  '../lib/underscore',
  '../lib/backbone',
  '../music/note',
  './midi',
  '../osc/sine'
], function(_, Backbone, Note, Midi, Sine) {

  // create a hash of midiKey -> key
  // based on this midi key chart: http://computermusicresource.com/midikeys.html
  var midi_to_key = {},
    scale = ['C', 'C#', 'D', 'D#',
      'E', 'F', 'F#', 'G', 'G#',
      'A', 'A#', 'B'];

  var msg = 0;
  for (var octave = -2, msg = 0; octave <= 8; octave++) {
    _.each(scale, function(key) {
      midi_to_key[msg] = { key: key, octave: octave }
      msg++;
    });
  };

  var Voice = Backbone.Model.extend({

    defaults: {
      key: 'C',
      octave: 4,
      generator: null
    },

    initialize: function() {
      Backbone.Model.prototype.initialize.apply(this, arguments);
      this.get('generator').set('frequency', this.getFrequency());
    },

    getFrequency: function() {
      var name = this.get('key') + this.get('octave'),
        frequency = Note.fromLatin(name).frequency();
      return frequency;
    }

  });

  var Voices = Backbone.Collection.extend({

    model: Voice

  });

  var Instrument = Midi.extend({

    defaults: {
      numInputs: 0,
      numOutputs: 1,
      generator: Sine
    },

    voices: null,

    initialize: function(attrs, options) {
      Midi.prototype.initialize.apply(this, arguments);
      this.voices = new Voices();
      _.bindAll(this);
    },

    generate: function(sampleRate) {

      var self = this,
        sample = 0,
        count = this.voices.length;

      this.voices.each(function(voice) {
        var generator = voice.get('generator');
        generator.generate(sampleRate);
        sample += (generator.outputs.at(0).samples[0] / count)
      });
      
      this.outputs.at(0).send([
        sample,
        sample
      ]);

    },

    noteOn: function(key, velocity) {
      this.voices.add(_.extend(midi_to_key[key], {
        generator: new (this.get('generator'))()
      }));
    },

    noteOff: function(key, velocity) {
      var voice = this.voices.find(function(voice) {
        return voice.get('key') == midi_to_key[key].key;
      });
      voice.destroy();
    }

  });

  return Instrument;

});