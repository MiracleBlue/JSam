require([
  'src/lib/zepto',
  'src/misc/midi-keyboard',
  'src/core/instrument',
  'src/core/oscilloscope',
  'src/core/speaker'
], function($, MidiKeyboard, Instrument, Oscilloscope, Speaker) {

  var keyboard = new MidiKeyboard(),
    instrument = new Instrument(),
    oscilloscope = new Oscilloscope(),
    speaker = new Speaker();

  // attach midi keyboard to instrument
  keyboard.on('midi', function(channel, key, vel) {
    instrument.midi(channel, key, vel);
  });

  // create graph
  // instrument => oscilloscope => speaker
  instrument.outputs.at(0).connect(oscilloscope.inputs.at(0));
  oscilloscope.outputs.at(0).connect(speaker.inputs.at(0));

  $('body').append(oscilloscope.view.render().el);

});