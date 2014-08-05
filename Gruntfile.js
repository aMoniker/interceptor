module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        notify_hooks: {
            options: {
                enabled: true,
                title: '[Interceptor]'
            }
        },
        notify: {
            js: {
                options: {
                    title: '[Interceptor] JS',
                    message: 'javascript compiled',
                }
            },
            karma: {
                options: {
                    title: '[Interceptor] Tests',
                    message: 'karma tests successful',
                }
            }
        },
        uglify: {
            main: {
                files: {
                    'dist/interceptor.min.js': [
                        'src/interceptor.js',
                    ]
                },
                options: {
                    sourceMap: true,
                    beautify: {
                        beautify: false,
                        ascii_only: true
                    }
                }
            },
        },
        karma: {
            tests: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS'],
            }
        },
        watch: {
            scripts: {
                files: [
                    'Gruntfile.js',
                    'src/**/*.js',
                ],
                tasks: ['compile-js']
            },
            tests: {
                files: [
                    'test/**/*.js',
                ],
                tasks: ['karma:tests'],
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-karma');
    
    grunt.task.run('notify_hooks');
    grunt.registerTask('compile-js', ['uglify', 'notify:js', 'karma-tests']);
    grunt.registerTask('karma-tests', ['karma:tests', 'notify:karma']);
    grunt.registerTask('default', ['watch']);
};
