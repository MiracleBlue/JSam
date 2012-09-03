require([
  'src/lib/zepto',
  'src/osc/sine',
  'src/filter/high-pass',
  'src/core/oscilloscope',
  'src/core/speaker'
], function($, Sine, HighPass, Oscilloscope, Speaker) {

  var sine = new Sine(),
    oscilloscope = new Oscilloscope(),
    high_pass = new HighPass({ frequency: 15500 }),
    speaker = new Speaker();

  // create graph
  // osc => low pass => oscilloscope => speaker
  sine.outputs.at(0).connect(high_pass.inputs.at(0));
  high_pass.outputs.at(0).connect(oscilloscope.inputs.at(0));
  oscilloscope.outputs.at(0).connect(speaker.inputs.at(0));

  // show oscilloscope view
  $('body').append(oscilloscope.view.render().el);

});