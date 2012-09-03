require([
  'src/lib/zepto',
  'src/osc/sine',
  'src/osc/square',
  'src/dsp/cross-fader',
  'src/core/oscilloscope',
  'src/core/speaker'
], function($, Sine, Square, CrossFader, Oscilloscope, Speaker) {

  var sine = new Sine(),
    square = new Square(),
    cross_fader = new CrossFader(),
    oscilloscope = new Oscilloscope(),
    speaker = new Speaker();

  // create graph
  // [sine, square] => cross-fader => oscilloscope => speaker
  sine.outputs.at(0).connect(cross_fader.inputs.at(0));
  square.outputs.at(0).connect(cross_fader.inputs.at(1));
  cross_fader.outputs.at(0).connect(oscilloscope.inputs.at(0));
  oscilloscope.outputs.at(0).connect(speaker.inputs.at(0));

  // show oscilloscope view
  $('body').append(oscilloscope.view.render().el);

});