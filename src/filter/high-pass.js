define([
  '../core/node'
], function(Node) {

  var AllPass = Node.extend({

    defaults: {
      numInputs: 1,
      numOutputs: 1
    }

  });

  return AllPass;

});