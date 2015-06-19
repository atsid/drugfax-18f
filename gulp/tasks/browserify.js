"use strict";

let gulp = require("gulp");
let gutil = require("gulp-util");
let config = require("../config");

let browserify = require("browserify");
let babelify = require("babelify");
let source = require("vinyl-source-stream");

gulp.task("browserify", function() {

    var b = browserify({
        entries: config.paths.src.CLIENT_ENTRIES,
        transform: [babelify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    b.on("log", gutil.log);

    return b
        .bundle()
        .on("error", gutil.log.bind(gutil, "Browserify Error"))
        .pipe(source(config.paths.out.CLIENT_DIST_BUNDLE))
        .pipe(gulp.dest(config.paths.out.CLIENT_DIST));

});
