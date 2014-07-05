module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var debug = grunt.option('env') !== 'production';

  grunt.config('env.' + grunt.option('env'), true);

  grunt.config('clean', ['./client/build']);

  grunt.config('browserify', {
    options: {
      debug: debug,
      watch: true
    },
    app: {
      files: [
        { src: './client/src/index.js', dest: './client/build/assets/index.js' }
      ]
    }
  });

  grunt.config('uglify', {
    scripts: {
      src: './client/build/assets/index.js',
      dest: './client/build/assets/index.min.js',
      options: {
        mangle: false
      }
    }
  });

  grunt.config('copy', {
    html: {
      src: './client/src/index.html',
      dest: './client/build/index.html',
      options: {
        process: function(content, srcpath) {
          return grunt.template.process(content);
        }
      }
    }
  });

  grunt.config('concurrent', {
    options: {
      logConcurrentOutput: true
    },
    develop: {
      tasks: ['watch', 'nodemon']
    }
  });

  grunt.config('nodemon', {
    develop: {
      script: './server/app',
      options: {
        watch: ['./server'],
        env: {
          NODE_ENV: 'development',
          NODE_CONFIG_DIR: './server/config'
        }
      }
    }
  });

  grunt.config('jshint', {
    options: {
      jshintrc: true
    },
    all: ['./Gruntfile.js', './client/src/**/*.js']
  });

  grunt.config('watch', {
    html: {
      files: ['./client/src/index.html'],
      tasks: ['copy:html']
    },
    jshint: {
      files: ['./Gruntfile.js', './client/src/**/*.js'],
      tasks: ['jshint']
    }
  });

  grunt.registerTask('develop', ['build', 'concurrent:develop']);
  grunt.registerTask('build', ['clean', 'jshint', 'browserify:app', 'uglify', 'copy']);

  grunt.registerTask('default', ['build']);
};
