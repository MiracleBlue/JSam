// a wrapper around Audiolet's `Buffer`
// provides:
// - backbone interface
// - html5 file loader
define([
  'backbone',
  'lodash',
  '../lib/audiolet',
  '../lib/audiofile',
  '../lib/jsmad',
  '../core/model'
], function(Backbone, _, Audiolet, audiofile, jsmad, Model) {

  var Buffer = Model.extend(_.extend({

    constructor: function(attrs, options) {

      var self = Model.apply(this, [attrs, options, 0, 1]),
        file = this.get('file');

      this.buffer = new AudioletBuffer(1, 0);
      _.extend(this, this.buffer, Buffer.prototype);

      // load file immediately if `file` attr was passed
      if (file) {
        this.load(file);
      }

      return self;

    },

    // override audiolet buffer to give it file reading capabilities
    // (path can be a string or html5 object)
    load: function(path, async, callback) {

      var self = this;

      var cb = function() {
        var fn = _.isFunction(async)? async: callback;
        fn && fn.apply(this, arguments);
        self.trigger('loaded');
      };

      // if it's a string use the normal audiofile/http request in audiolet
      if (typeof(path) === 'string') {
        this.buffer.load.apply(this, [path, async, cb]);

      // otherwise assume it's a file object
      } else {
        var file = new AudioFile(path);
        file.decode(function(decoded) {
          self.setDecoded(decoded, cb);
        });
      }

      return this;

    }

  }, Backbone.Events));

  return Buffer;

});