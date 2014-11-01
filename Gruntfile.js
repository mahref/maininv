module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        meta: {
            banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
        },

        // configure tasks
        clean: {
            dev: {
                src: ['dev']
            },
            dist: {
            src: ['dist']
            }
        },

        copy: {
            main: {
                files: [
                    {
                        nonull: true,
                        src: ['vendor/angular.js'],
                        dest: 'dev/angular.js',
                    },

                    {
                        nonull: true,
                        src: ['vendor/angular.min.js'],
                        dest: 'dist/angular.min.js',
                    },
                ],
            },
        },

        concat: {
            js: {
                src: ["src/js/**/*.js"],
                dest: "dev/app.js"
            },
            css: {
                src: "src/css/**/*.css",
                dest: "dev/app.css"
            }
        },
        
        cssmin: {
            compress: {
                files: {
                    "dist/app.min.css": "<%= concat.css.dest %>"
                }
            }
        },

        uglify: {
            js: {
                src: "<%= concat.js.dest %>",
                dest: "dist/app.min.js"
            }
        },

        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ["<%= concat.js.src %>"],
                tasks: "concat:js"
            },
            css: {
                files: ["<%= concat.css.src %>"],
                tasks: "concat:css"
            },
            homepage: {
                files: ["<%= homepage.template %>"],
                tasks: ["homepage:dev"]
            }
        },

        homepage: {
            template: "src/index.us",
            dev: {
                dest: "dev/index.html",
                context: {
                    js: "app.js",
                    css: "app.css",
                    angular: "angular.js",
                }
            },
            dist: {
                dest: "dist/index.html",
                context: {
                    js: "app.min.js",
                    css: "app.min.css",
                    angular: "angular.min.js",
                }
            }
        },

        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: "localhost",
                    bases: ["dev"],
                    livereload: true
                }
            }
        }
    });

    // load tasks from npm
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-express");

    grunt.loadTasks("tasks");

    // setup the workflow
    grunt.registerTask("dev", ["clean", "concat", "copy", "homepage:dev", "express", "watch"]);
    grunt.registerTask("dist", ["clean", "concat", "copy", "uglify", "cssmin", "homepage:dist"]);
    grunt.registerTask("default", "dev");
}