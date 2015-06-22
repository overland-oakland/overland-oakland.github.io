'use strict';

// Directory reference:
/////DEV
//   less: _app/styles/less
//   scripts: _app/scripts/js
/////STAGE
//   css: _app/styles/css
//   js: .tmp/js
/////PRODUCTION
//   css: dist/css
//   javascript: dist/js
//   images: dist/img
//   fonts: dist/fonts

module.exports = function (grunt) {
  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Configurable paths
    config: {
      app: '_app',
      dist: 'dist'
    },
    watch: {
      less: {
        files: ['<%= config.app %>/styles/less/**/*.less'],
        tasks: ['less']
        //tasks: ['less', 'autoprefixer', 'csslint', 'cssmin']
      }
      //js: {},
      //jekyll: {},
      //livereload: {}
    },
    less: {
      css: {  //compile to CSS
        options: {  //output sourcemap
          strictMath: false,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'main.min.css.map',
          sourceMapFilename: '<%= config.dist %>/css/main.css.map'
        },
        files: {
          '<%= config.app %>/styles/css/main.css': ['<%= config.app %>/styles/less/main.less']
        }
      },
      minify: { //minify CSS file
        options: {
          cleancss: true
        },
        files: {
          '<%= config.dist %>/css/main.min.css': ['<%= config.app %>/styles/css/main.css']
        }
      }
    }
    //autoprefixer: {
    //  options: {
    //    browsers: ['last 2 versions']
    //  },
    //  dist: {
    //    files: [{
    //      expand: true,
    //      cwd: '<%= config.app %>/styles/css/',
    //      src: '*.css',
    //      //dest: '<%= config.app %>/styles/css'
    //      dest: '<%= config.dist %>/css/'
    //    }]
    //  }
    //},
    //csslint: {
    //  dist: {
    //    src: ['<%= config.dist %>/css/*.css']
    //  }
    //},
    //cssmin: {}
  });

  //Define Tasks
  grunt.registerTask('default', ['watch']);
};


