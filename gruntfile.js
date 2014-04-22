'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        dirs: {
            // configurable paths
            app: 'app',
            lib: 'lib',
            coverageE2E: 'coverage',
            instrumentedE2E: '<%= dirs.coverageE2E %>/instrumented'
//            protractorConfigFile: '/usr/local/lib/node_modules/protractor/referenceConf.js'
        },

        // Empties folders to start fresh
        clean: {
            src: ['<%= dirs.coverageE2E %>/']
        },

        // Copies remaining files to places other tasks can use
        copy: {
            appFiles:{
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= dirs.app %>',
                    dest: '<%= dirs.instrumentedE2E %>/app',
                    src: [
                        'assets/stylesheets/**/*',
                        'controllers/**/*',
                        'helpers/**/*',
                        'mailers/**/*',
                        'models/**/*',
                        'views/**/*'
                    ]
                }]
            },
            libFiles:{
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= dirs.lib %>',
                    dest: '<%= dirs.instrumentedE2E %>/lib',
                    src: [
                        'assets/fonts/**/*',
                        'assets/images/**/*',
                        'assets/stylesheets/**/*'
                    ]
                }]
            }

        },
        instrument: {
            files: [
                'app/assets/javascripts/application.js',
                'app/assets/javascripts/youtube.js',
                'lib/assets/javascripts/harmony/assets/core/js/cta.js',
                'lib/assets/javascripts/harmony/assets/core/js/video.js',
                'lib/assets/javascripts/harmony/assets/core/js/youtube.js'
            ],
            options: {
                lazy: true,
                basePath: '/Users/mkam1/michelle_sbm_workspace/CMT/harmony_cms/dev/spec/dummy/test/js/functional/protractor/coverage/instrumented/'    //'<%= dirs.instrumentedE2E %>/'
            }
        },

        shell: {
            rails_server: {
                command: 'rails server',
                options: {
                    async: true,     //an async process will be terminated when grunt finishes
                    execOptions: {
                        cwd: '/Users/mkam1/michelle_sbm_workspace/CMT/harmony_cms/dev/spec/dummy/coverage/instrumented'//,
//                        detached: true //if true, process is kept running after grunt completes
                    }
                }
            },
            selenium_server: {
                command: 'webdriver-manager start',
                options: {
                    async: true, //if false, process is kept running in background after grunt finishes. if true, process runs in background when grunt is finished.
                    execOptions: {
                        cwd: '/Users/mkam1/michelle_sbm_workspace/CMT/harmony_cms/dev/spec/dummy/node_modules/protractor/'
                        //detached: false //if true, process is kept running after grunt completes. but either set to true or false, the server seems to just
                        // hang after starting up and grunt does not progress through the rest of tasks in the script ==> this value does not seem to make a difference
                        //whether true or false.
                    }
                }
            }
        },

        protractor_coverage: {
            options: {
                configFile: '/Users/mkam1/michelle_sbm_workspace/CMT/harmony_cms/dev/spec/dummy/test/js/functional/protractor/tests/protractorConf.js', // Default config file
                //configFile: 'test/js/functional/protractor/tests/protractorConf.js', // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                coverageDir: '<%= dirs.instrumentedE2E %>',
                debug: false,
                args: {}
            },
            chrome: {
                options: {
                    args: {
                        baseUrl: 'http://localhost:3000/',
                        'browser': 'chrome'
                    }
                }
            }
        },

        makeReport: {
            src: '<%= dirs.instrumentedE2E %>/*.json',
            options: {
                type: 'lcov',
                dir: '<%= dirs.coverageE2E %>/reports',
                print: 'detail'
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
        'copy:appFiles',
        'copy:libFiles',
        'instrument',
//        'shell:rails_server',
//        'shell:selenium_server',
        'protractor_coverage:chrome',
        'makeReport'
    ]);
};