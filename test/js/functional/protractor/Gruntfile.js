//Not using this gruntfile. See the one under spec/dummy instead.

//// Generated on 2014-03-24 using generator-angular-fullstack 1.3.2
//'use strict';
//
//// # Globbing
//// for performance reasons we're only matching one level down:
//// 'test/spec/{,*/}*.js'
//// use this if you want to recursively match all subfolders:
//// 'test/spec/**/*.js'
//
//module.exports = function(grunt) {
//
//    require('load-grunt-tasks')(grunt);
//
//    // Define the configuration for all the tasks
//    grunt.initConfig({
//
//        // Project settings
//        dirs: {
//            // configurable paths
//            app: '../../../../app',
//            lib: '../../../../lib',
//            coverageE2E: 'coverage',
//            instrumentedE2E: 'coverage/instrumented',
//            protractorConfigFile: '/usr/local/lib/node_modules/protractor/referenceConf.js'
//        },
//
//        // Empties folders to start fresh
//        clean: {
//            src: ['<%= dirs.coverageE2E %>/']
//        },
//
//        // Copies remaining files to places other tasks can use
//        copy: {
//            app:{
//                files: [{
//                    expand: true,
//                    dot: true,
//                    cwd: '<%= dirs.app %>',
//                    dest: '<%= dirs.instrumentedE2E %>/app',
//                    src: [
//                      ''  '*.{ico,png,txt}',
//                        '.htaccess',
//                        'assets/**/*',
//                        'images/**/*',
//                        'fonts/**/*',
//                        'views/**/*',
//                        'styles/**/*'''
//                    ]
//                }]
//            },
//            lib: {
//                files: [{
//                    expand: true,
//                    dot: true,
//                    cwd: '<%= dirs.lib %>',
//                    dest: '<%= dirs.instrumentedE2E %>/lib',
//                    src: [
//                        '*.{ico,png,txt}',
//                        '.htaccess',
//                        'assets/**/*',
//                        'images/**/*',
//                        'fonts/**/*',
//                        'views/**/*',
//                        'styles/**/*'
//                    ]
//                }]
//            }
//
//        },
//
//        // start - code coverage settings
//        //, '<%= dirs.app %>/../lib/assets/javascripts/**/*.js'
//        instrument: {
//            files: ['<%= dirs.app %>/assets/javascripts/*.js'],
//            options: {
//                lazy: true,
//                basePath: '<%= dirs.instrumentedE2E %>/'
//            }
//        },
//
//        makeReport: {
//            src: '<%= dirs.instrumentedE2E %>/*.json',
//            options: {
//                type: 'lcov',
//                dir: '<%= dirs.coverageE2E %>/reports',
//                print: 'detail'
//            }
//        },
//
//        protractor_coverage: {
//            options: {
//                configFile: '<%= dirs.protractorConfigFile %>', // Default config file
//                keepAlive: true, // If false, the grunt process stops when the test fails.
//                noColor: false, // If true, protractor will not use colors in its output.
//                coverageDir: '<%= dirs.instrumentedE2E %>',
//                args: {}
//            },
//            chrome: {
//                options: {
//                    args: {
//                        baseUrl: 'http://localhost:3000/',
//                        // Arguments passed to the command
//                        'browser': 'chrome'
//                    }
//                }
//            }
//        }
//    });
//
//    grunt.registerTask('default', [
//        'clean',
//        'copy:coverageE2E',
////        'instrument',
////        'protractor_coverage:chrome',
////        'makeReport'
//    ]);
//};