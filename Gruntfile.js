'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'dist/MainPage.min.js': ['dev/Page.js'],
                    'dist/MainPageControl.min.js': ['dev/PageControl.js']
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'dist/MainPage.min.css': ['dev/Page.css']
                }
            }
        },
        processhtml: {
            dist: {
                options: {
                    data: {
                        message: 'Go to production distribution'
                    }
                },
                files: {
                    'index.html': ['DevIndex.html']
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['Sass/*.scss', 'dev/*.js', 'DevIndex.html', 'LocalData/Config.json'],
                tasks: ['sass', 'build']
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: '.',
                    hostname: 'localhost',
                    protocol: 'http',
                    livereload: true,
                    open: true,
                }
            }
        },
        sass: {
            dist: {
                options: {
                    includePaths : [
                      require('node-bourbon').includePaths,
                      require("bourbon-neat").includePaths
                    ]
                },
                files: {
                    'dev/Page.css': 'sass/Page.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadTasks('tasks');

    grunt.registerTask('compile-css', ['sass']);
    grunt.registerTask('build', ['uglify', 'cssmin', 'processhtml']);
    grunt.registerTask('server', ['connect', 'watch']);
};
