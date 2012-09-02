module.exports = function(grunt) {

  grunt.initConfig({

    clean: ['dist/'],

    requirejs: {
      mainConfigFile: 'js/index.js',
      out: 'dist/staging/require.js',
      name: 'index',
      wrap: false,
      insertRequire: ['app']
    },

    concat: {
      dist: {
        dest: 'dist/staging/require.js',
        separator: ';',
        src: [
          'js/lib/require.js',
          'dist/staging/require.js'
        ]
      }
    },

    min: {
      'dist/release/require.js': ['dist/staging/require.js']
    }

  });

  grunt.registerTask('release', [
    'clean',
    'requirejs',
    'concat',
    'min'
  ].join(' '));

};