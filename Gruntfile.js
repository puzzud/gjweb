/*global module, require*/

module.exports = function (grunt) {
  'use strict';
  
  grunt.uri = './';

  var tasks = {};
  tasks.pkg = grunt.file.readJSON(grunt.uri + "package.json");
  
  // URI Paths
  grunt.uriSrc = grunt.uri + 'src/';
  grunt.uriGame = grunt.uriSrc + 'game/';
  grunt.uriPhaser = grunt.uriSrc + 'phaser/';
  grunt.uriThree = grunt.uriSrc + 'three/';
  
  grunt.uriTools = grunt.uri + 'tools/';
  grunt.uriTask = grunt.uriTools + 'grunt/';

  grunt.uriWww = grunt.uri + 'www/';
  
  grunt.uriBuild = grunt.uri + 'build/';
  grunt.uriBuildGame = grunt.uriBuild + tasks.pkg.name + '/';
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
  
  grunt.registerTask('build_desktop', ['build_www', 'nwjs']);
  
  grunt.registerTask('insert_cordova', ['processhtml:cordova']);
  grunt.registerTask('build_cordova_www', ['build_www', 'insert_cordova']);
  
  grunt.registerTask('add_android', ['cordovacli:add_android', 'cordovacli:add_plugins']);
  grunt.registerTask('build_mobile', ['clean:android', 'build_cordova_www', 'add_android', 'cordovacli:build_android', 'copy:android']);
  
  grunt.registerTask('add_web', ['cordovacli:add_browser', 'cordovacli:add_plugins']);
  grunt.registerTask('build_web', ['clean:web', 'build_cordova_www', 'add_web', 'cordovacli:build_browser', 'copy:web']);
  
  grunt.registerTask('build', ['lint', 'build_web', 'build_desktop', 'build_mobile']);

  grunt.registerTask('setuplibs', ['copy:phaser', 'copy:three']);
  grunt.registerTask('rename', ['replace:rename']);

  grunt.registerTask('default', ['lint']);

  // Initialize The Grunt Configuration
  grunt.initConfig(tasks);
};
