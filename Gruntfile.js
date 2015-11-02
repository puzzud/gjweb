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
  
  // NW JS Tasks
  tasks = require(grunt.uriTask + 'nwjs.js')(grunt, tasks);

  // Register Tasks
  grunt.registerTask('lint', ['csslint', 'htmllint', 'jshint']);
  grunt.registerTask('default', ['lint']);

  // Initialize The Grunt Configuration
  grunt.initConfig(tasks);
};
