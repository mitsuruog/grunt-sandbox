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
          port: 9000,
          middleware: function(connect, options){
            return [
              connect.static(options.base),
              require('grunt-connect-proxy/lib/utils').proxyRequest
            ];
          }
        }
      },
        proxies: [{
          context: [
            '/items/',
            '/users/'
            ],
          host: 'localhost',
          port: 3000
        }]
    },
    open: {
      server: {
        path: 'http://localhost:9000'
      }
    },
    clean: ['dist', '.tmp'],
    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8 
      },
      assets: {
        files: [{
          src: [
            'public/javascripts/**/*.{js}',
            'public/stylesheets/**/*.{css}'
          ]
        }]
      }
    },
    useminPrepare: {
      html: 'public/index.html',
      options: {
        dest: 'dist'
      }
    }
  });

  // Default task(s).
  grunt.registerTask('server', function(target) {

    grunt.task.run([
      'configureProxies',
      'connect',
      'open',
      'watch'
    ]);

  });

grunt.registerTask('build', [
  'clean',
  'useminPrepare',
  'rev'
  ]);

  };