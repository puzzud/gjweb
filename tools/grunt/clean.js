/*global module*/

module.exports = function (grunt, tasks) {
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // The configuration for a specific task.
  tasks.clean = {
    // Remove www sub-directory.
    www: [grunt.uriWww],

    // Remove www sub-directory files which are not
    // intended for debug builds.
    debug: [
      '!' + grunt.uriWwwSrc + 'phaser/*.js',
      grunt.uriWwwSrc + 'phaser/*min.js',
      grunt.uriWwwSrc + 'phaser/*.map'
    ],

    // Remove www sub-directory files which are not
    // intended for release builds.
    release: [
      grunt.uriWwwGame + '*.js',
      '!' + grunt.uriWwwGame + '*.min.js',
      grunt.uriWwwSrc + 'phaser/*.js',
      '!' + grunt.uriWwwSrc + 'phaser/*min.js'
    ],

    // Remove android build.
    android: [grunt.uriBuildAndroid],

    // Remove ios build.
    ios: [grunt.uriBuildIos],

    // Remove web build.
    web: [grunt.uriBuildWeb]
  };

  return tasks;
};
