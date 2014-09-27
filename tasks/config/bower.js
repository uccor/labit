/**
 * Bower
 */
module.exports = function(grunt) {

    grunt.config.set('bower', {
        dev: {
            dest: '.tmp/public',
            js_dest: '.tmp/public/js',
            css_dest: '.tmp/public/styles',
            options: {}
        }
    });

    grunt.loadNpmTasks('grunt-bower');
};
