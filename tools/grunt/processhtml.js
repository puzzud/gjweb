/*global module*/

module.exports = function (grunt, tasks) {
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-processhtml');

  // The configuration for a specific task.
  tasks.processhtml = {
    options: {},
    cordova: {
      files: {
        'www/index.html': ['index.html']
      }
    }
  };

  return tasks;
};
