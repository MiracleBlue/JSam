// a wrapper around Audiolet's `Gain`
// provides:
// - backbone interface
define([
  'lodash',
  '../lib/audiolet',
  '../core/model'
], function(_, Audiolet, Model) {

  var NewHighPassFilter = Model.extend({

    defaults: {
      frequency: 1
    },

    constructor: function(attrs, options) {

      var self = Model.apply(this, [attrs, options, 1, 1]),
        audiolet = options.audiolet,
        frequency = this.get('frequency');

      this.filter = new HighPassFilter(audiolet, frequency);
      this.bindProperties();
      this.route();
      
      return self;

    },

    bindProperties: function() {

      this.on('change:frequency', function(self, frequency) {
        self.filter.frequency.setValue(frequency);
      });

      return this;

    },

    route: function() {
      var filter = this.filter;
      this.inputs[0].connect(filter);
      filter.connect(this.outputs[0]);
      return this;
    }

  });

  return NewHighPassFilter;

});