module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            "build": {
                "src": ["lib/connector.socketIO.js", "lib/connector.browsers.js", "lib/connector.polyfills.js", "lib/connector.printStackTrace.js" ],
                "dest": "js/connector.js"
            }
        }
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Task definitions
    grunt.registerTask('build', ['concat']);
};
