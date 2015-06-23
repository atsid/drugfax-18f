"use strict";

let gulp = require("gulp");
let sass = require("gulp-sass");
let config = require("../config");

gulp.task("sass", function () {
  gulp.src(config.globs.src.CLIENT_STYLES)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(config.globs.out.CLIENT_STYLES_DIST));
});
