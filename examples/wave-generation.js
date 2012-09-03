require([
  'src/lib/zepto',
  'src/osc/sine',
  'src/core/oscilloscope',
  'src/core/speaker'
], function($, Sine, Oscilloscope, Speaker) {

  var sine = new Sine(),
    oscilloscope = new Oscilloscope(),
    speaker = new Speaker();

  // create graph
  // sine => oscilloscope => speaker
  sine.outputs.at(0).connect(oscilloscope.inputs.at(0));
  oscilloscope.outputs.at(0).connect(speaker.inputs.at(0));

  $('body').append(oscilloscope.view.render().el);

});