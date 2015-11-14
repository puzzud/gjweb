/*global module*/

module.exports = function (grunt, tasks) {
  'use strict';

  var fileHash = [];
  fileHash[grunt.uriWww + "index.html"] = ["index.html"];
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-processhtml');

  // The configuration for a specific task.
  tasks.processhtml = {
    options: {},
    cordova: {
      files: fileHash
    }
  };

  return tasks;
};
