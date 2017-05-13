/*global module*/

module.exports = function (grunt, tasks) {
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-nw-builder');

  // The configuration for a specific task.
  tasks.nwjs = {
    // The files that we want to check.
    options:
    {
      platforms: ['win64', 'osx64', 'linux64'], // TODO: Pull these platforms from package.json somehow?
      buildType: function(){return grunt.buildName},
      buildDir: grunt.uriBuild, // Where the build version of my NW.js app is saved.
      cacheDir: grunt.uriNodeModules + 'grunt-nw-builder/cache',
      winIco: "./assets/graphics/icons/win/icon.ico",
      macIcns: "./assets/graphics/icons/osx/icon.icns",
      zip: true
    },
    src: [grunt.uriWww + "**/*"] // NW.js app location.
  };

  return tasks;
};
