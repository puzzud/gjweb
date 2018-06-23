/*global module*/

module.exports = function(grunt, tasks)
{
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // The configuration for a specific task.
  tasks.copy =
  {
    // Copy Phaser source files into project src.
    phaser:
    {
      files:
      [
        {
          expand: true,
          cwd: grunt.uriNodeModules + 'phaser/build/',
          src:
          [
            'phaser*'
          ],
          dest: grunt.uriPhaser,
          nonull: true
        }
      ]
    },

    // Copy critical files into the www sub-directory.
    www:
    {
      files:
      [
        {
          expand: true,
          src:
          [
            grunt.uri + 'assets/**',
            grunt.uriSrc + '**',
            grunt.uri + 'index.html',
            grunt.uri + '*.css',
            grunt.uri + 'package.json'
          ],
          dest: grunt.uriWww,
          nonull: true
        }
      ]
    },

    // Copy over android build.
    debug_android:
    {
      files:
      [
        {
          expand: true,
          cwd: grunt.uri + 'platforms/android/app/build/outputs/apk/debug/',
          src:
          [
            'app-debug.apk',
            '!output.json'
          ],
          dest: grunt.uriBuildAndroid,
          nonull: true
        },
      ]
    },

    release_android:
    {
      files:
      [
        {
          expand: true,
          cwd: grunt.uri + 'platforms/android/app/build/outputs/apk/release/',
          src:
          [
            'app-release-unsigned.apk',
            '!output.json'
          ],
          dest: grunt.uriBuildAndroid,
          nonull: true
        },
      ]
    },

    // Copy over web build.
    web:
    {
      files:
      [
        {
          expand: true,
          cwd: grunt.uri + 'platforms/browser/www/',
          src: ['**'],
          dest: grunt.uriBuildWeb,
          nonull: true
        }
      ]
    }
  };

  return tasks;
};
