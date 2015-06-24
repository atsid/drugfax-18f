"use strict";
let jefferson = require("express-jefferson");
let debug = require("../../../middleware/debug");

module.exports = jefferson.router({
    routes: {
        "/": {
            get: [
                debug.send("GET /auth/facebook")
            ]
        },
        "/callback": {
            get: [
                debug.send("GET /auth/facebook/callback")
            ]
        }
    }
});
