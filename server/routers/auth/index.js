"use strict";
let mountie = require("express-mountie");
let jefferson = require("express-jefferson");
let path = require("path");
let auth = require("app/middleware/auth");

let app = jefferson.app({
    routes: {
        "/": {
            get: [ auth.index ]
        }
    }
});

mountie({
    parent: app,
    src: path.join(__dirname, "methods"),
    prefix: (name) => `/${name}`
});

module.exports = app;

