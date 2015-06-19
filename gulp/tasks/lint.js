"use strict";

let gulp = require("gulp");
let eslint = require("gulp-eslint");
let config = require("../config");

gulp.task("lint", () => {
    return gulp.src(config.paths.src.LINT_JS)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
