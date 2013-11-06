/*
 * declutter
 * https://github.com/Voles/declutter
 *
 * Copyright (c) 2013 Voles
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('declutter', 'A Grunt module that checks if you explicitly defined which files from a folder you want to select.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      rules: {}
    });

    var invalidComponents = [];
    console.log(this.files);
    this.files.forEach(function(f) {
      var componentName = f.substring(f.lastIndexOf('/') + 1, f.length);

      if (!options.rules[componentName]) {
        invalidComponents.push(componentName);
      }

      if (invalidComponents.length >= 1) {
        var componentsList = '';

        invalidComponents.forEach(function (component) {
          componentsList += '- ' + component + '\n';
        });

        grunt.fatal('Please update the \'vendorFiles\' section in \'build.config.js\' and specify ' +
                    'which files to include in the final build for the following components:\n' + 
                    componentsList, 1);
      }


      /*
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
      */
    });
  });

};
