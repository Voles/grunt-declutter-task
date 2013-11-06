'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('declutter', 'A Grunt module that checks if you explicitly defined the files you want to use, for each folder.', function() {
    var options = this.options({
      rules: {}
    });

    var invalidComponents = [];
    this.files.forEach(function (files) {
      grunt.file.expand(files.src).forEach(function (f) {
        var componentName = f.substring(f.lastIndexOf('/') + 1, f.length);
        if (!options.rules[componentName]) {
          invalidComponents.push(componentName);
        }
      });
    });

  
    if (invalidComponents.length >= 1) {
      var componentsList = '';

      invalidComponents.forEach(function (component) {
        componentsList += '- ' + component + '\n';
      });

      grunt.fatal('Please update the declutter options and specify ' +
                  'which files to include for the following components:\n' + 
                  componentsList, 1);
    }
  });
};
