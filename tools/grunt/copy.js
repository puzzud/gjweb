/*global module*/

module.exports = function (grunt, tasks) {
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // The configuration for a specific task.
  tasks.copy = {

    // Copy Phaser source files into project src.
    phaser: {
      files: [
        {
          expand: true,
          cwd: './node_modules/phaser/build/',
          src: [
            'phaser*'
          ],
          dest: './src/phaser/',
          nonull: true
        }
      ]
    },

    // Copy Three JS source files into project src.
    three: {
      files: [
        {
          expand: true,
          cwd: './node_modules/three/',
          src: [
            'three*'
          ],
          dest: './src/three/'
        }
      ]
    },

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
    },

    // Copy over android build.
    android: {
      files: [
        {
          expand: true,
          cwd: './platforms/android/build/outputs/apk/',
          src: [
            'android-*.apk',
            '!android-*unaligned.apk'
          ],
          dest: './build/gametitle/android/',
          nonull: true
        }
      ]
    },

    // Copy over web build.
    web: {
      files: [
        {
          expand: true,
          cwd: './platforms/browser/www/',
          src: ['**'],
          dest: './build/gametitle/web',
          nonull: true
        }
      ]
    }
  };

  return tasks;
};
