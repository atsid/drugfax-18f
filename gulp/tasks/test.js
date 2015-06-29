"use strict";
let gulp = require("gulp");
let gutil = require("gulp-util");
let mocha = require("gulp-mocha");
let istanbul = require("gulp-istanbul");
let isparta = require("isparta");
let exit = require("gulp-exit");
let empty = require("gulp-empty");
let config = require("../config");
let src = config.globs.src;
let out = config.globs.out;

let handleErr = (tdd, resolve, reject) => (err) => {
    if (tdd) {
        gutil.log("TDD Error: ", err);
        resolve();
    } else {
        reject(err);
    }
};

let instrumentSource = (glob, tdd=false) => {
    return new Promise((resolve, reject) => {
        return gulp.src(glob)
            .pipe(istanbul({
                instrumenter: isparta.Instrumenter,
                includeUntested: true
            }))
            .on("error", handleErr(tdd, resolve, reject))
            .pipe(istanbul.hookRequire())
            .on("error", handleErr(tdd, resolve, reject))
            .on("finish", resolve);
    });
};

let writeReports = (reportDir) => {
    return istanbul.writeReports({
        dir: reportDir,
        reporters: ["lcov", "text-summary"]
    });
};

let instrument = (sourceGlob, reportDir, doExit, callback, tdd=false) => {
    return instrumentSource(sourceGlob, tdd)
        .then(() => {
            return new Promise((resolve, reject) => {
                callback()
                    .on("error", handleErr(tdd, resolve, reject))
                    .pipe(writeReports(reportDir))
                    .pipe(doExit ? exit() : empty())
                    .on("end", resolve)
                    .on("error", handleErr(tdd, resolve, reject));
            });
        });
};

let runTestBatch = (testGlob) => {
    return gulp.src(testGlob).pipe(mocha({reporter: process.env.TEST_REPORTER || "spec"}));
};

let runTests = (testGlob, sourceGlob, reportDir, doExit = true, tdd=false) => () => instrument(sourceGlob, reportDir, doExit, () => runTestBatch(testGlob), tdd);

gulp.task("server-unit-test", runTests(src.SERVER_TESTS, src.SERVER_JS, out.SERVER_COVERAGE_OUTPUT));
gulp.task("server-unit-test-tdd", runTests(src.SERVER_TESTS, src.SERVER_JS, out.SERVER_COVERAGE_OUTPUT, false, true));
gulp.task("client-unit-test", runTests(src.CLIENT_TESTS, src.CLIENT_JS, out.CLIENT_COVERAGE_OUTPUT, false));
gulp.task("client-unit-test-tdd", runTests(src.CLIENT_TESTS, src.CLIENT_JS, out.CLIENT_COVERAGE_OUTPUT, false, true));
gulp.task("test", runTests(src.ALL_TESTS, src.COVERAGE_JS, out.COMBINED_COVERAGE_OUTPUT));

gulp.task("server-tdd", () => {
    gulp.watch(config.globs.src.SERVER_ALL_JS, ["lint-server", "server-unit-test-tdd"]);
});
gulp.task("client-tdd", () => {
    gulp.watch(config.globs.src.CLIENT_ALL_JS, ["lint-client", "client-unit-test-tdd"]);
});
