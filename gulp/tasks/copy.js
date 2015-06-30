"use strict";

let gulp = require("gulp");
let config = require("../config");

gulp.task("copy", function() {

    // copy html
    gulp.src(config.globs.src.CLIENT_HTML)
        .pipe(gulp.dest(config.globs.out.CLIENT_DIST));

    // copy assets
    gulp.src(config.globs.src.CLIENT_ASSETS)
        .pipe(gulp.dest(config.globs.out.CLIENT_ASSETS_DIST));
});
