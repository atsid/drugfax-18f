"use strict";

let gulp = require("gulp");
let config = require("../config");

gulp.task("copy", function() {

    // copy html
    gulp.src(config.paths.src.CLIENT_HTML)
        .pipe(gulp.dest(config.paths.out.CLIENT_DIST));
});
