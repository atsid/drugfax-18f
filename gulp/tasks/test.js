"use strict";

let gulp = require("gulp");
let mocha = require("gulp-mocha");
let istanbul = require("gulp-istanbul");
let isparta = require("isparta");
let config = require("../config");
let src = config.globs.src;
let out = config.globs.out;

let runTests = (testGlob, sourceGlob, reportDir) => () => {
    return new Promise((resolve, reject) => {
        gulp.src(sourceGlob)
            .pipe(istanbul({
                instrumenter: isparta.Instrumenter,
                includeUntested: true
            }))
            .pipe(istanbul.hookRequire())
            .on("finish", () => {
                gulp.src(testGlob)
                    .pipe(mocha({reporter: process.env.TEST_REPORTER || "spec"}))
                    .pipe(istanbul.writeReports({
                        dir: reportDir,
                        reporters: ["lcov", "text-summary"]
                    }))
                    .on("end", resolve);
            })
            .on("error", (err) => { reject(err); });
    });
};

gulp.task("server-unit-test", runTests(src.SERVER_TESTS, src.SERVER_JS, out.SERVER_COVERAGE_OUTPUT));
gulp.task("client-unit-test", runTests(src.CLIENT_TESTS, src.CLIENT_JS, out.CLIENT_COVERAGE_OUTPUT));
gulp.task("test", ["server-unit-test", "client-unit-test"]);
