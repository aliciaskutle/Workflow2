module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    sass: {
      dist: {
        files: {
          "dist/css/style.css": "sass/style.scss"
        }
      }
    },
    copy: {
      files: {
        cwd: "app",
        src: "**/*.html",
        dest: "dist",
        expand: true
      }
    },
    cssmin: {
      minify: {
        src: "dist/css/style.css",
        dest: "dist/css/minified/style.min.css"
      }
    },
    imagemin: {
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: "src/img/",
            src: ["**/*.jpg", "**/*.jpeg"],
            dest: "dist/img/",
            ext: ".jpg"
          }
        ]
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ["dist/css/minified/style.min.css", "*.html"]
        },
        options: {
          watchTask: true,
          server: "./"
        }
      }
    },
    watch: {
      css: {
        files: "sass/style.scss",
        tasks: ["sass", "cssmin"]
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.registerTask("default", [
    "browserSync",
    "watch",
    "sass",
    "copy",
    "imagemin"
  ]);
};
