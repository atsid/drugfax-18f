"use strict";

let gulp = require("gulp");
let gutil = require("gulp-util");
let config = require("../config");

let watchify = require("watchify");
let browserify = require("browserify");
let babelify = require("babelify");
let source = require("vinyl-source-stream");

gulp.task("watch", function() {

    // watch js and lint
    gulp.watch(config.paths.src.LINT_JS, ["lint"]);

    // watch html
    gulp.watch(config.paths.src.CLIENT_HTML, ["copy"]);

    // watch client js
    var watcher = watchify(browserify({
        entries: config.paths.src.CLIENT_ENTRIES,
        transform: [babelify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }));

    function bundle() {
        return watcher
            .bundle()
            .on("error", gutil.log.bind(gutil, "Browserify Error"))
            .pipe(source(config.paths.out.CLIENT_DIST_BUNDLE))
            .pipe(gulp.dest(config.paths.out.CLIENT_DIST));
    }

    watcher.on("update", bundle);
    watcher.on("log", gutil.log);
});
