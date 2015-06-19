"use strict";

let gulp = require("gulp");
let mocha = require("gulp-mocha");
let istanbul = require("gulp-istanbul");
let isparta = require("isparta");
let config = require("../config");

let runTests = (testGlob, sourceGlob, reportDir, reporter) => {
    return new Promise((resolve, reject) => {
        gulp.src(sourceGlob)
            .pipe(istanbul({
                instrumenter: isparta.Instrumenter,
                includeUntested: true
            }))
            .pipe(istanbul.hookRequire())
            .on("finish", () => {
                gulp.src(testGlob)
                    .pipe(mocha({reporter: reporter || "spec"}))
                    .pipe(istanbul.writeReports({
                        dir: config.paths.out.SERVER_COVERAGE_OUTPUT,
                        reporters: ["lcov", "text-summary"]
                    }))
                    .on("end", resolve);
            })
            .on("error", (err) => { reject(err); });
    });
};

gulp.task("server-unit-test", () => {
    return runTests(config.paths.src.SERVER_TESTS, config.paths.src.SERVER_JS, process.env.TEST_REPORTER);
});

gulp.task("client-unit-test", () => {
    return runTests(config.paths.src.CLIENT_TESTS, config.paths.src.CLIENT_JS, process.env.TEST_REPORTER);
});
