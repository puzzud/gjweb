/*global module*/

module.exports = function(grunt, tasks)
{
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-contrib-rename');
  
  // The configuration for a specific task.
  tasks.rename =
  {
    // Rename src/game/AppTitle.js
    // to match values in the current package.json.
    module:
    {
      files:
      [
        {
          src: grunt.uriMain + 'AppTitle' + '.js', // TODO: Get this from package.json.
          dest: grunt.uriMain + tasks.pkg.namespace + '.js'
        }
      ]
    }
  };

  return tasks;
};
