require([
  'src/osc/sine',
  'src/dsp/gain',
  'src/core/speaker'
], function(Sine, Gain, Speaker) {

  var sine = new Sine(),
    gain = new Gain(),
    speaker = new Speaker();

  sine.outputs.at(0).connect(gain.inputs.at(0));
  gain.outputs.at(0).connect(speaker.inputs.at(0));

});