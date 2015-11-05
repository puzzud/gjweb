/*global module*/

module.exports = function (grunt, tasks) {
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // The configuration for a specific task.
  tasks.clean = {
    // Remove www sub-directory.
    www: ["./www"],

    // Remove android build.
    android: ["./build/gametitle/android"],

    // Remove ios build.
    ios: ["./build/gametitle/ios"],

    // Remove web build.
    web: ["./build/gametitle/web"]
  };

  return tasks;
};
