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
                    message: 'javascript compiled'
                }
            }
        },
        uglify: {
            main: {
                files: {
                    'dist/js/interceptor.min.js': [
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
        watch: {
            scripts: {
                files: [
                    'Gruntfile.js',
                    'src/**/*.js',
                ],
                tasks: ['compile-js']
            },
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-notify');
    
    grunt.task.run('notify_hooks');
    grunt.registerTask('compile-js', ['uglify', 'notify:js']);
    grunt.registerTask('default', ['watch']);
};
