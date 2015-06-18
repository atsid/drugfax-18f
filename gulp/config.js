"use strict";

module.exports = {
    paths: {
        LINT_JS: ["client/**/*.js", "server/**/*.js", "*.js", "gulp/**/*.js"],

        src: {
            CLIENT_JS: ["client/**/*.js"],
            SERVER_JS: ["server/**/*.js"],

            STYLES: ["client/styles/**/*.sass"],
            ASSETS: ["client/assets/**/*.*"],

            SERVER_TESTS: ["server/**/*.spec.js"],
            CLIENT_TESTS: ["client/**/*.spec.js"]
        },

        out: {
            SERVER_COVERAGE_OUTPUT: "target/test-reports/server",
            CLIENT_COVERAGE_OUTPUT: "target/test-reports/client"
        }
    }
};
