"use strict";

let gulp = require("gulp");
let eslint = require("gulp-eslint");
let config = require("../config");

let lint = (glob) => () => {
    return gulp.src(glob)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};

gulp.task("lint-client", lint(config.globs.src.CLIENT_ALL_JS));
gulp.task("lint-server", lint(config.globs.src.SERVER_ALL_JS));
gulp.task("lint", lint(config.globs.src.LINT_JS));
