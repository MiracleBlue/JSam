require([
  'src/lib/zepto',
  'src/osc/sine',
  'src/filter/high-pass',
  'src/core/oscilloscope',
  'src/core/speaker'
], function($, WhiteNoise, HighPass, Oscilloscope, Speaker) {

  var white_noise = new WhiteNoise(),
    oscilloscope = new Oscilloscope(),
    low_pass = new HighPass({ frequency: 15500 }),
    speaker = new Speaker();

  // create graph
  // osc => low pass => oscilloscope => speaker
  white_noise.outputs.at(0).connect(low_pass.inputs.at(0));
  low_pass.outputs.at(0).connect(oscilloscope.inputs.at(0));
  oscilloscope.outputs.at(0).connect(speaker.inputs.at(0));

  // show oscilloscope view
  $('body').append(oscilloscope.view.render().el);

});