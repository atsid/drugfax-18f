"use strict";

let gulp = require("gulp");
let runSequence = require("run-sequence");

gulp.task("default", (cb) => {
    return runSequence(
        "lint",
        "sass",
        "copy",
        "browserify",
        "test",
        cb
    );
});
