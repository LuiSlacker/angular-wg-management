module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        ngdocs: {
            all: ['src/resources/js/*.js']
        }
    });

    // Load the plugin that provide tasks.
    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.registerTask('docs', 'Generate documentation', ['ngdocs']);
};