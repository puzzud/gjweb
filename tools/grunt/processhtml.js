/*global module*/

module.exports = function(grunt, tasks)
{
  'use strict';
  /*
  var cordovaFileHash = [];
  cordovaFileHash[grunt.uriWww + "index.html"] = ["index.html"];
  
  var releaseFileHash = [];
  releaseFileHash[grunt.uriWww + "index.html"] = [grunt.uriWww + "index.html"];
  */
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-processhtml');

  // The configuration for a specific task.
  tasks.processhtml =
  {
    cordova:
    {
      options: {},
      //files: cordovaFileHash
      files: {'./www/index.html': ["index.html"]}
    },
    release:
    {
      options: {},
      //files: releaseFileHash
      files: {'./www/index.html': ["./www/index.html"]}
    }
  };

  return tasks;
};
