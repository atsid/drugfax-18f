"use strict";

module.exports = {
    globs: {
        src: {
            LINT_JS: ["client/**/*.js", "server/**/*.js", "*.js", "gulp/**/*.js"],
            COVERAGE_JS: ["client/**/*.js", "server/**/*.js", "!**/*.spec.js"],

            CLIENT_ALL_JS: ["client/**/*.js"],
            CLIENT_JS: ["client/**/*.js", "!client/**/*.spec.js"],
            CLIENT_ENTRIES: ["client/app.js"],

            SERVER_ALL_JS: ["server/**/*.js"],
            SERVER_JS: ["server/**/*.js", "!server/**/*.spec.js"],

            CLIENT_STYLES: ["client/styles/**/*.scss"],
            CLIENT_ASSETS: ["client/assets/**/*.*"],
            CLIENT_HTML: ["client/**/*.html"],

            SERVER_TESTS: ["server/**/*.spec.js"],
            CLIENT_TESTS: ["client/**/*.spec.js"],
            ALL_TESTS: ["server/**/*.spec.js", "client/**/*.spec.js"]
        },

        out: {
            SERVER_COVERAGE_OUTPUT: "target/test-reports/server",
            CLIENT_COVERAGE_OUTPUT: "target/test-reports/client",
            COMBINED_COVERAGE_OUTPUT: "target/test-reports/combined",

            CLIENT_DIST: "public",
            CLIENT_STYLES_DIST: "public/styles",
            CLIENT_DIST_BUNDLE: "app.js"
        }
    }
};
