require([
  'src/lib/zepto',
  'src/osc/sine',
  'src/dsp/gain',
  'src/core/oscilloscope',
  'src/core/speaker'
], function($, Sine, Gain, Oscilloscope, Speaker) {

  var sine = new Sine(),
    lfo = new Sine({ frequency: 0.1 }),
    gain = new Gain(),
    oscilloscope = new Oscilloscope(),
    speaker = new Speaker();

  // create graph
  // sine => oscilloscope => speaker
  sine.outputs.at(0).connect(gain.inputs.at(0));
  gain.outputs.at(0).connect(oscilloscope.inputs.at(0));
  oscilloscope.outputs.at(0).connect(speaker.inputs.at(0));

  // modulate gain level
  lfo.outputs.at(0).connect(gain.inputs.at(1));

  $('body').append(oscilloscope.view.render().el);

});