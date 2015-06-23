"use strict";
let gulp = require("gulp");
let gutil = require("gulp-util");
let nodemon = require("gulp-nodemon");

gulp.task("nodemon", () => {
    return nodemon({
        script: "index",
        ext: "js",
        env: {
            'DEBUG': 'app*,jefferson*,mountie*'
        },
        tasks: ["lint-server", "server-unit-test"]
    })
        .on("error", (err) => gutil.log("nodemon error", err))
        .on("restart", () => gutil.log("restarting server"));
});

gulp.task("develop", ["watch", "nodemon"]);
