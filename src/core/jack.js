define([
  '../lib/backbone'
], function(Backbone) {

  var Jack = Backbone.Model.extend({

    connectedFrom: null,
    connectedTo: null,
    samples: null,

    connect: function(jack) {
      this.connectedTo = jack;
      jack.connectedFrom = this;
    },

    disconnect: function() {
      this.connectedTo && delete this.connectedTo.connectedFrom;
      this.connectedTo && delete this.connectedTo;
    },

    send: function(samples) {
      this.samples = samples;
      this.connectedTo && this.connectedTo.send(samples);
    }

  });

  return Jack;

});