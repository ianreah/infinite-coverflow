module.exports = function(grunt) {
    grunt.initConfig({
        bower: {
            main: {
                rjsConfig: 'js/main.js'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'js/**/*.js', 'specs/**/*.js'],
            options: {
                ignores: ['js/vendor/*.js']
            }
        },
        jasmine: {
            src: ['js/**/*.js'],
            options: {
                specs: ['specs/**/*.spec.js'],
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfigFile: 'js/main.js',
                    requireConfig: {
                        baseUrl: 'js'
                    }
                }
            }
        },
        watch: {
            files: ['Gruntfile.js', 'js/**/*.js', 'specs/**/*.js'],
            tasks: ['jshint', 'jasmine']
        }
    });
    
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('travis', ['jshint', 'jasmine']);
    grunt.registerTask('default', ['jshint', 'jasmine', 'watch']);
};