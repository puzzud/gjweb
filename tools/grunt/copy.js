/*global module*/

module.exports = function (grunt, tasks) {
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // The configuration for a specific task.
  tasks.copy = {
    // Copy critical files into the www sub-directory.
    www: {
      files: [
        {
          expand: true,
          src: [
            './assets/**',
            './src/**',
            './index.html',
            './style.css',
            './package.json'
          ],
          dest: './www/',
          nonull: true
        }
      ]
    }
  };

  return tasks;
};
