/*global module, require*/

module.exports = function (grunt) {
  'use strict';

  require('time-grunt')(grunt);
  
  grunt.uri = './';

  var tasks = {};
  tasks.pkg = grunt.file.readJSON(grunt.uri + "package.json");
  
  // Get a string of index.html contents.
  var indexHtmlBuffer = grunt.file.read(grunt.uri + 'index.html');
  if(indexHtmlBuffer !== null)
  {
    tasks.indexHtml = indexHtmlBuffer.toString();
  }

  // URI Paths
  grunt.uriSrc = grunt.uri + 'src/';
  grunt.uriGame = grunt.uriSrc + 'game/';
  grunt.uriPhaser = grunt.uriSrc + 'phaser/';
  grunt.uriThree = grunt.uriSrc + 'three/';
  
  grunt.uriTools = grunt.uri + 'tools/';
  grunt.uriTask = grunt.uriTools + 'grunt/';

  grunt.uriWww = grunt.uri + 'www/';
  grunt.uriWwwSrc = grunt.uriWww + 'src/'
  grunt.uriWwwGame = grunt.uriWwwSrc + 'game/'
  
  var releaseTaskList =
  [
    "release",
    "release_desktop",
    "release_web",
    "release_mobile",
    "release_android",
    "release_ios"
  ];

  // Set Build URI based on whether using a release task or not.
  if(releaseTaskList.indexOf(grunt.cli.tasks[0]) > -1 )
  {
    grunt.uriBuild = grunt.uri + 'build/release/';
    grunt.buildName = tasks.pkg.name + '-' + tasks.pkg.version;
  }
  else
  {
    grunt.uriBuild = grunt.uri + 'build/debug/';
    grunt.buildName = tasks.pkg.name;
  }
  
  grunt.uriBuildGame = grunt.uriBuild + grunt.buildName + '/';

  grunt.uriBuildWeb = grunt.uriBuildGame + "web/";
  grunt.uriBuildAndroid = grunt.uriBuildGame + "android/";
  grunt.uriBuildIos = grunt.uriBuildGame + "ios/";

  grunt.uriNodeModules = grunt.uri + "node_modules/";

  // Tasks  
  tasks.concat = {};

  var taskFileList =
  [
    "csslint.js",
    "htmllint.js",
    "jshint.js",
    "clean.js",
    "copy.js",
    "replace.js",
    "concat.js",
    "uglify.js",
    "processhtml.js",
    "nwjs.js",
    "cordovacli.js"
  ];

  for(var i = 0; i < taskFileList.length; i++)
  {
    require(grunt.uriTask + taskFileList[i])(grunt, tasks);
  }

  // Register Tasks
  grunt.registerTask('lint', ['csslint', 'htmllint', 'jshint']);

  grunt.registerTask('clean_www', ['clean:www']);
  grunt.registerTask('build_www', ['clean_www', 'copy:www']);
  
  grunt.registerTask('debug_www', ['concat:www', 'clean:debug']);
  grunt.registerTask('release_www', ['concat:www', 'uglify:release', 'clean:release', 'processhtml:release']);

  grunt.registerTask('build_desktop', ['build_www', 'debug_www', 'nwjs']);
  grunt.registerTask('release_desktop', ['build_www', 'release_www', 'nwjs']);
  
  grunt.registerTask('insert_cordova', ['processhtml:cordova']);
  grunt.registerTask('build_cordova_www', ['build_www', 'insert_cordova']);
  
  grunt.registerTask('add_android', ['cordovacli:add_android', 'cordovacli:add_plugins']);
  grunt.registerTask('build_android', ['clean:android', 'build_cordova_www', 'debug_www', 'add_android', 'cordovacli:build_android', 'copy:debug_android']);
  grunt.registerTask('release_android', ['clean:android', 'build_cordova_www', 'release_www', 'add_android', 'cordovacli:release_android', 'copy:release_android']);

  grunt.registerTask('build_mobile', ['build_android']);
  grunt.registerTask('release_mobile', ['release_android']);

  grunt.registerTask('add_web', ['cordovacli:add_browser', 'cordovacli:add_plugins']);
  grunt.registerTask('build_web', ['clean:web', 'build_cordova_www', 'debug_www', 'add_web', 'cordovacli:build_browser', 'copy:web']);
  grunt.registerTask('release_web', ['clean:web', 'build_cordova_www', 'release_www', 'add_web', 'cordovacli:release_browser', 'copy:web']);

  grunt.registerTask('build', ['lint', 'build_web', 'build_desktop', 'build_mobile']);
  grunt.registerTask('release', ['lint', 'release_web', 'release_desktop', 'release_mobile']);

  grunt.registerTask('setuplibs', ['copy:phaser', 'copy:three']);
  grunt.registerTask('rename', ['replace:rename']);

  grunt.registerTask('default', ['lint']);

  // Initialize The Grunt Configuration
  grunt.initConfig(tasks);
};
