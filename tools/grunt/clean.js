/*global module*/

module.exports = function (grunt, tasks) {
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // The configuration for a specific task.
  tasks.clean = {
    // Remove www sub-directory.
    www: [grunt.uriWww],

    // Remove android build.
    android: [grunt.uriBuildAndroid],

    // Remove ios build.
    ios: [grunt.uriBuildIos],

    // Remove web build.
    web: [grunt.uriBuildWeb]
  };

  return tasks;
};
