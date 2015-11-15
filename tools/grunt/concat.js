/*global module*/

module.exports = function (grunt, tasks) {
  'use strict';
  
  // Load node module required for this task.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Build an ordered list of files to concatenate from index.html.
  var jsFileList = [];
  if(tasks.indexHtml !== undefined)
  {
    var buildJsReleaseMatch = tasks.indexHtml.match(/<!--\s*build:js:release\s*src\/game\/game.min.js\s*-->([\s\S]*)<!--\s*\/build\s*-->/i);
    if(buildJsReleaseMatch !== null)
    {
      var buildJsReleaseString = buildJsReleaseMatch[1];
      var scriptElementMatch = buildJsReleaseString.match(/<script\s+type="text\/javascript"\s+src="[^"]*">[^<]*<\/script>/gi);
      if(scriptElementMatch !== null)
      {
        for(var i = 0; i < scriptElementMatch.length; i++)
        {
          var srcMatch = scriptElementMatch[i].match(/src="([^"]*)"/i); 
          jsFileList.push(grunt.uriWww + srcMatch[1]);
        }
      }
    }
  }

  jsFileList.push(grunt.uriWwwGame + '*.js');
  jsFileList.push('!' + grunt.uriWwwGame + '*.min.js');

  // The configuration for a specific task.
  tasks.concat = {
    options: {
      separator: ';'
    },
    www: {
      src: jsFileList,
      dest: grunt.uriWwwGame + 'game.js',
    },
  };

  return tasks;
};
