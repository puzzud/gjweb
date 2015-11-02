/*global module*/

module.exports = function (grunt, tasks) {
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-nw-builder');

  // The configuration for a specific task.
  tasks.nwjs = {
    // The files that we want to check.
    options: {
        platforms: ['win64', 'osx64', 'linux64'], // TODO: Pull these platforms from package.json somehow?
        buildDir: grunt.uriBuild, // Where the build version of my NW.js app is saved.
    },
    src: [grunt.uri + 'www/**/*'] // NW.js app location.
  };

  return tasks;
};
