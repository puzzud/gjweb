/*global module*/

module.exports = function(grunt, tasks)
{
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-cordovacli');

  // The configuration for a specific task.
  tasks.cordovacli =
  {
    options:
    {
      path: '.',
      cli: 'cordova'
    },
    add_android:
    {
      options:
      {
        command: 'platform',
        action: 'add',
        platforms: ['android']
      }
    },
    add_ios:
    {
      options:
      {
        command: 'platform',
        action: 'add',
        platforms: ['ios']
      }
    },
    add_browser:
    {
      options:
      {
        command: 'platform',
        action: 'add',
        platforms: ['browser']
      }
    },
    add_plugins:
    {
      options:
      {
        command: 'plugin',
        action: 'add',
        plugins:
        [
          //'cordova-plugin-crosswalk-webview'
        ]
      }
    },
    remove_plugins:
    {
      options:
      {
        command: 'plugin',
        action: 'rm',
        plugins:
        [
          //'cordova-plugin-crosswalk-webview'
        ]
      }
    },

    // Debug Build.
    build_android:
    {
      options:
      {
        command: 'build',
        platforms: ['android']
      }
    },
    build_ios:
    {
      options:
      {
        command: 'build',
        platforms: ['ios']
      }
    },
    build_browser:
    {
      options:
      {
        command: 'build',
        platforms: ['browser']
      }
    },

    // Release Build.
    release_android:
    {
      options:
      {
        command: 'build',
        args:['--release'],
        platforms: ['android']
      }
    },
    release_ios:
    {
      options:
      {
        command: 'build',
        args:['--release'],
        platforms: ['ios']
      }
    },
    release_browser:
    {
      options:
      {
        command: 'build',
        args:['--release'],
        platforms: ['browser']
      }
    }
  };

  return tasks;
};
