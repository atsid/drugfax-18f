"use strict";
let config = require("config");
let session = require("cookie-session");
let cookieParser = require("cookie-parser");

module.exports = {
    name: "cookie-based sessions",
    configure(app) {
        app.use(cookieParser());
        app.use(session({
            name: "ats-18f-drugfax",
            secret: config.security.sessionStateSecret,
            proxy: true
        }));
    }
};
