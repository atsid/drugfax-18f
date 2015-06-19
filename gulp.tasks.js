"use strict";
let gulp = require("gulp");
let eslint = require("gulp-eslint");
let mocha = require("gulp-mocha");
let istanbul = require("gulp-istanbul");
let isparta = require("isparta");
let runSequence = require("run-sequence");

let globs = {
    lintSourceJs: ["client/**/*.js", "server/**/*.js", "*.js"],
    serverUnitTests: ["server/**/*.spec.js"],
    serverSource: ["server/**/*.js", "!server/**/*.spec.js"]
};

let paths = {
    serverCoverageOutput: "target/test-reports/server"
};

gulp.task("lint", () => {
    return gulp.src(globs.lintSourceJs)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

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
                        dir: paths.serverCoverageOutput,
                        reporters: ["lcov", "text-summary"]
                    }))
                    .on("end", resolve);
            })
            .on("error", (err) => { reject(err); });
    });
};

gulp.task("server-unit-test", () => {
    return runTests(globs.serverUnitTests, globs.serverSource, process.env.TEST_REPORTER);
});

gulp.task("default", (cb) => {
    return runSequence(
        "lint",
        "server-unit-test",
        cb
    );
});
