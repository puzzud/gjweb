/*global module*/

module.exports = function(grunt, tasks)
{
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-contrib-rename');
  
  // The configuration for a specific task.
  tasks.rename =
  {
    // Rename src/game/GameTitle.js
    // to match values in the current package.json.
    module:
    {
      files:
      [
        {
          src: grunt.uriGame + 'GameTitle' + '.js',
          dest: grunt.uriGame + tasks.pkg.namespace + '.js'
        }
      ]
    }
  };

  return tasks;
};
