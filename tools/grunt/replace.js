/*global module*/

module.exports = function(grunt, tasks)
{
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-replace');
  
  // The configuration for a specific task.
  tasks.replace =
  {
    // Rename all occurrences to GameTitle, gametitle, "Game Title"
    // in this project to match values in the current package.json.
    rename:
    {
      options:
      {
        patterns:
        [
          {
            match: 'gametitle',
            replace: '<%= pkg.name %>'
          },
          {
            match: 'GameTitle',
            replace: '<%= pkg.namespace %>'
          },
          {
            match: 'Game Title',
            replace: '<%= pkg.window.title %>'
          }
        ],
        usePrefix: false,
        force: false
      },
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
            grunt.uri + 'config.xml'
          ],
          dest: grunt.uri
        }
      ]
    }
  };

  return tasks;
};
