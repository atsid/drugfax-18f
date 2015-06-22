"use strict";
let gulp = require("gulp");
let gutil = require("gulp-util");
let nodemon = require("gulp-nodemon");

gulp.task("develop", () => {
    nodemon({
        script: "index",
        ignore: ["node_modules"],
        ext: "js",
        tasks: ["lint", "test"]
    })
    .on("error", gutil.log.bind(gutil, "Browserify Error"))
    .on("restart", () => gutil.log.bind(gutil, "restarting server"));
});
