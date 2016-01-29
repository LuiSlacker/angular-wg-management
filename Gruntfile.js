module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        ngdocs: {
            options: {
                dest: 'public/docs'
            },
            all: ['public/javascripts/**/*.js']
        }
    });

    // Load the plugin that provide tasks.
    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.registerTask('docs', 'Generate documentation', ['ngdocs']);
};