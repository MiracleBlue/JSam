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
    },

    server: {

      debug: {
        folders: {
          'src': './src'
        },
        files: {
          'index.js': 'index.js',
          'app.js': 'app.js'
        }
      },

      release: {
        host: '0.0.0.0',
        folders: {
          'src': './dist/release'
        }
      }
    }

  });

  grunt.registerTask('release', [
    'clean',
    'requirejs',
    'concat',
    'min'
  ].join(' '));

};