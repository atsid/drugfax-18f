"use strict";
let mountie = require("express-mountie");
let jefferson = require("express-jefferson");
let path = require("path");
let auth = require("../../middleware/auth");

let router = jefferson.router({
    routes: {
        "/": {
            get: [auth.index]
        },
        "/current": {
            get: [auth.getCurrentUser],
            delete: [auth.logout]
        }
    }
});

mountie({
    parent: router,
    src: path.join(__dirname, "methods"),
    prefix: (name) => `/${name}`
});

module.exports = router;

