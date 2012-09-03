require([
  'src/osc/sine',
  'src/core/speaker'
], function(Sine, Speaker) {

  var sine = new Sine(),
    speaker = new Speaker();

  // create graph
  // sine => speaker
  sine.outputs.at(0).connect(speaker.inputs.at(0));

});