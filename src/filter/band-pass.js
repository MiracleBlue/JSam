define([
  './biquad'
], function(Biquad) {

  var two_pi = 2 * Math.PI;

  var AllPass = Biquad.extend({

    calculate: function(frequency, sampleRate) {

      var w0 = two_pi * frequency / sampleRate,
        cosw0 = Math.cos(w0),
        sinw0 = Math.sin(w0),
        alpha = sinw0 / (2 / Math.sqrt(2));

      this.b0 = alpha;
      this.b1 = 0;
      this.b2 = -alpha;
      this.a0 = 1 + alpha;
      this.a1 = -2 * cosw0;
      this.a2 = 1 - alpha;

    }

  });

  return AllPass;

});