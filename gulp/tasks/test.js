"use strict";
let gulp = require("gulp");
let mocha = require("gulp-mocha");
let istanbul = require("gulp-istanbul");
let isparta = require("isparta");
let exit = require("gulp-exit");
let config = require("../config");
let src = config.globs.src;
let out = config.globs.out;

let instrument = (sourceGlob, reportDir, callback) => {
    return new Promise((resolve, reject) => {
        gulp.src(sourceGlob)
            .pipe(istanbul({
                instrumenter: isparta.Instrumenter,
                includeUntested: true
            }))
            .pipe(istanbul.hookRequire())
            .on("finish", () => {
                callback()
                    .pipe(istanbul.writeReports({
                        dir: reportDir,
                        reporters: ["lcov", "text-summary"]
                    }))
                    .pipe(exit())
                    .on("end", resolve)
                    .on("error", reject);
            });
    });
};

let runTestBatch = (testGlob) => {
    return gulp.src(testGlob).pipe(mocha({reporter: process.env.TEST_REPORTER || "spec"}));
};

let runTests = (testGlob, sourceGlob, reportDir) => () => instrument(sourceGlob, reportDir, () => runTestBatch(testGlob));

gulp.task("server-unit-test", runTests(src.SERVER_TESTS, src.SERVER_JS, out.SERVER_COVERAGE_OUTPUT));
gulp.task("client-unit-test", runTests(src.CLIENT_TESTS, src.CLIENT_JS, out.CLIENT_COVERAGE_OUTPUT));
gulp.task("test", runTests(src.ALL_TESTS, src.COVERAGE_JS, out.COMBINED_COVERAGE_OUTPUT));
