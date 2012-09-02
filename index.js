require([
  'src/osc/sine',
  'src/dsp/gain',
  'src/core/speaker'
], function(Sine, Gain, Speaker) {

  var sine = new Sine(),
    speaker = new Speaker();

  sine.outputs.at(0).connect(speaker.inputs.at(0));

});