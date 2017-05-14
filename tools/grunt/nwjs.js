/*global module*/

module.exports = function(grunt, tasks)
{
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-nw-builder');

  var platforms = ["win64", "osx64", "linux64"]; // TODO: Pull these platforms from package.json somehow?
  var buildDir = grunt.uriBuild; // Where the build version of NW.js app is saved.
  var cacheDir = grunt.uriNodeModules + "grunt-nw-builder/cache";
  var winIco = "./assets/graphics/icons/win/icon.ico";
  var macIcns = "./assets/graphics/icons/osx/icon.icns";
  var src = [grunt.uriWww + "**/*"]; // NW.js app location.

  // The configuration for a specific task.
  tasks.nwjs =
  {
    debug:
    {
      options:
      {
        platforms: platforms,
        buildType: function(){return grunt.buildName},
        flavor: "sdk",
        zip: false,
        buildDir: buildDir,
        cacheDir: cacheDir,
        winIco: winIco,
        macIcns: macIcns
      },
      src: src
    },
    release:
    {
      options:
      {
        platforms: platforms,
        buildType: function(){return grunt.buildName},
        flavor: "normal",
        zip: true,
        buildDir: buildDir,
        cacheDir: cacheDir,
        winIco: winIco,
        macIcns: macIcns
      },
      src: src
    }
  };

  return tasks;
};
