"use strict";

let gulp = require("gulp");
let gutil = require("gulp-util");
let config = require("../config");

let browserify = require("browserify");
let babelify = require("babelify");
let uglifyify = require("uglifyify");
let source = require("vinyl-source-stream");
let envify = require("envify/custom");
let buffer = require("vinyl-buffer");

gulp.task("browserify", function() {

    var b = browserify({
        entries: config.globs.src.CLIENT_ENTRIES,
        transform: [babelify, [envify({_: "purge", NODE_ENV: "production"}), { global: true }], [uglifyify, { global: true }]],
        debug: false,
        cache: {},
        packageCache: {}
    });

    b.on("log", gutil.log);

    return b
        .bundle()
        .on("error", gutil.log.bind(gutil, "Browserify Error"))
        .pipe(source(config.globs.out.CLIENT_DIST_BUNDLE))
        .pipe(buffer())
        .pipe(gulp.dest(config.globs.out.CLIENT_DIST));

});
