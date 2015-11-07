/*global module, require*/

module.exports = function (grunt) {
  'use strict';
  
  // URI paths for our tasks to use.
  grunt.uri = './';
  
  grunt.uriSrc = grunt.uri + 'src/';
  grunt.uriGame = grunt.uriSrc + 'game/';
  
  grunt.uriTools = grunt.uri + 'tools/';
  grunt.uriTask = grunt.uriTools + 'grunt/';
  
  grunt.uriBuild = grunt.uri + 'build/';

  // Our task object where we'll store our configuration.
  var tasks = {};
  tasks.concat = {};

  // Lint Tasks
  tasks = require(grunt.uriTask + 'csslint.js')(grunt, tasks);
  tasks = require(grunt.uriTask + 'htmllint.js')(grunt, tasks);
  tasks = require(grunt.uriTask + 'jshint.js')(grunt, tasks);

  // Clean Tasks
  tasks = require(grunt.uriTask + 'clean.js')(grunt, tasks);
  
  // Copy Tasks
  tasks = require(grunt.uriTask + 'copy.js')(grunt, tasks);

  // Process HTML Tasks
  tasks = require(grunt.uriTask + 'processhtml.js')(grunt, tasks);

  // NW JS Tasks
  tasks = require(grunt.uriTask + 'nwjs.js')(grunt, tasks);

  // Cordova Tasks
  tasks = require(grunt.uriTask + 'cordovacli.js')(grunt, tasks);

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

  grunt.registerTask('default', ['lint']);

  // Initialize The Grunt Configuration
  grunt.initConfig(tasks);
};
