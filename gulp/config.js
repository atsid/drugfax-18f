"use strict";

module.exports = {
    globs: {
        src: {
            LINT_JS: ["client/**/*.js", "server/**/*.js", "*.js", "gulp/**/*.js"],

            CLIENT_ALL_JS: ["client/**/*.js"],
            CLIENT_JS: ["client/**/*.js", "!client/**/*.spec.js"],
            CLIENT_ENTRIES: ["client/app.js"],

            SERVER_ALL_JS: ["server/**/*.js"],
            SERVER_JS: ["server/**/*.js", "!server/**/*.spec.js"],

            CLIENT_STYLES: ["client/styles/**/*.sass"],
            CLIENT_ASSETS: ["client/assets/**/*.*"],
            CLIENT_HTML: ["client/**/*.html"],

            SERVER_TESTS: ["server/**/*.spec.js"],
            CLIENT_TESTS: ["client/**/*.spec.js"]
        },

        out: {
            SERVER_COVERAGE_OUTPUT: "target/test-reports/server",
            CLIENT_COVERAGE_OUTPUT: "target/test-reports/client",

            CLIENT_DIST: "public",
            CLIENT_DIST_BUNDLE: "app.js"
        }
    }
};
