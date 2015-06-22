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
    .on("error", (err) => gutil.log("nodemon error", err))
    .on("restart", () => gutil.log("restarting server"));
});
