//livereload: trueと同じ意味っぽい
// var lrSnippet = require('connect-livereload')({
//   port: 35729
// });

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: 'public/**/*.js',
        options: {
          livereload: 35729,
        },
      },
    },
    connect: {
      server: {
        options: {
          livereload: true,
          base: 'public',
          //同じ意味らしい
          // middleware: function(connect) {
          //   return [
          //     lrSnippet,
          //     connect.static(require('path').resolve('public'))
          //   ];
          // },
          hostname: 'localhost',
          port: 9000
        },
        proxies: [{
          context: [
            '/hoge/',
            '/fuga/'
            ],
          host: 'localhost',
          port: 9001
        }]
      }
    },
    open: {
      server: {
        path: 'http://localhost:9000'
      }
    },
  });

  // Default task(s).
  grunt.registerTask('server', function(target) {

    grunt.task.run([
      'connect',
      'open',
      'watch'
    ]);

  });

};