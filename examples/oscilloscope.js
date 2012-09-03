require([
  'src/lib/zepto',
  'src/osc/variable',
  'src/dsp/gain',
  'src/core/oscilloscope',
  'src/core/speaker'
], function($, Osc, Gain, Oscilloscope, Speaker) {

  var osc = new Osc(),
    gain = new Gain(),
    oscilloscope = new Oscilloscope(),
    speaker = new Speaker();

  // create graph
  // osc => gain => oscilloscope => speaker
  osc.outputs.at(0).connect(gain.inputs.at(0));
  gain.outputs.at(0).connect(oscilloscope.inputs.at(0));
  oscilloscope.outputs.at(0).connect(speaker.inputs.at(0));

  // show oscilloscope view
  $('body').append(oscilloscope.view.render().el);

  // setup demo UI
  $(function() {

    var buttons = {

      "osc.set('shape', 'sine');": function() {
        osc.set('shape', 'sine');
      },

      "osc.set('shape', 'saw');": function() {
        osc.set('shape', 'saw');
      },

      "osc.set('shape', 'square');": function() {
        osc.set('shape', 'square');
      },

      "osc.set('frequency', 400);": function() {
        osc.set('frequency', 400);
      },

      "osc.set('frequency', 290);": function() {
        osc.set('frequency', 290);
      },

      "gain.set('level', 0.3);": function() {
        gain.set('level', 0.3);
      },

      "gain.set('level', 0.6);": function() {
        gain.set('level', 0.6);
      }

    }
    
    for (var i in buttons) {
      var label = i,
        action = buttons[label],
        $button = $('<button />');
      $button.text(label);
      $button.click(action);
      $('body').append($('<div />').append($button));
    }

  });

});