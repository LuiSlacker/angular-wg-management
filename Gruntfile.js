/**
 * Created by petulantslacker on 29/01/16.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngdocs: {
            all: ['public/javascripts/*.js']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-ngdocs');

    // Default task(s).
    grunt.registerTask('default', ['ngdocs']);

};