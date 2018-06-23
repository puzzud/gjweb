/*global module*/

module.exports = function(grunt, tasks)
{
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // The configuration for a specific task.
  tasks.uglify =
  {
    release:
    {
      options:
      {
        mangle:
        {
          toplevel: true,
          eval: true
        },
        compress:
        {
          sequences: true,
          properties: true,
          dead_code: true,
          unsafe: true,
          conditionals: true,
          comparisons: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          hoist_funs: true,
          hoist_vars: true,
          if_return: true,
          join_vars: true,
          negate_iife: true,
          pure_getters: true,
          keep_fargs: true,
          keep_fnames: false,
          drop_console: false
        }
      },
      files:
      {
        './www/src/main/Main.min.js':
        [
          './www/src/main/Main.js',
          '!./www/src/main/*.min.js'
        ]
      }
    }
  };

  return tasks;
};
