"use strict";
let gulp = require("gulp");
let gutil = require("gulp-util");
let config = require("../config");

let watchify = require("watchify");
let browserify = require("browserify");
let buffer = require("vinyl-buffer");
let babelify = require("babelify");
let source = require("vinyl-source-stream");

let lrload = require("livereactload");

gulp.task("watch", () => {
    // watch js and lint
    gulp.watch(config.globs.src.CLIENT_ALL_JS, ["lint-client", "client-unit-test-tdd"]);

    // watch html
    gulp.watch(config.globs.src.CLIENT_HTML, ["copy"]);

    // watch sass
    gulp.watch(config.globs.src.CLIENT_STYLES, ["sass"]);

    // watch client js
    lrload.monitor(`${config.globs.out.CLIENT_DIST}/${config.globs.out.CLIENT_DIST_BUNDLE}`, {displayNotification: true});

    var watcher = watchify(browserify({
        entries: config.globs.src.CLIENT_ENTRIES,
        transform: [babelify, lrload],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }));

    function bundle() {
        return watcher
            .on("error", gutil.log.bind(gutil, "Browserify Error"))
            .bundle()
            .on("error", gutil.log.bind(gutil, "Bundling Error"))
            .pipe(source(config.globs.out.CLIENT_DIST_BUNDLE))
            .pipe(buffer())
            .pipe(gulp.dest(config.globs.out.CLIENT_DIST));
    }

    watcher.on("update", bundle);
    watcher.on("log", gutil.log);
    watcher.on("error", gutil.log.bind(gutil, "Watcher Error"));
    return bundle();
});
