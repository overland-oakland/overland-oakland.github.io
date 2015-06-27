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
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
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
      },
      js: {
        files: ['<%= config.app %>/scripts/**/*'],
        tasks: ['concat:bowerComponents', 'concat:dist', 'uglify']
      }
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
    },
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
    //cssmin: {},

    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      bowerComponents: {
        // the files to concatenate
        src: [
          '<%= config.app %>/bower_components/jquery/dist/jquery.js',
          '<%= config.app %>/bower_components/bootstrap/js/transition.js',
          '<%= config.app %>/bower_components/bootstrap/js/scrollspy.js',
          '<%= config.app %>/bower_components/bootstrap/js/tab.js',
          '<%= config.app %>/bower_components/bootstrap/js/collapse.js',
          '<%= config.app %>/bower_components/bootstrap/js/affix.js',
          '<%= config.app %>/bower_components/bootstrap-tabcollapse/bootstrap-tabcollapse.js'
          //'<%= config.dev %>/scripts/lib/*.js'
        ],
        // the location of the resulting JS file
        dest: '<%= config.app %>/scripts/lib/vendor.js'
      },
      dist: {
        src: [
          '<%= config.app %>/scripts/lib/vendor.js',
          '<%= config.app %>/scripts/main.js'
          //'<%= config.dev %>/scripts/lib/*.js'
        ],
        dest: '<%= config.dist %>/js/scripts.js'
      }
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= config.dist %>/js/scripts.min.js': ['<%= concat.dist.dest %>']
        }
      }
    }
  });

  //Define Tasks
  grunt.registerTask('default', ['watch', 'less', 'concat:bowerComponents', 'concat:dist', 'uglify']);
};


