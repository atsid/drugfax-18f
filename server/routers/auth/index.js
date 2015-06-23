"use strict";
let mountie = require("express-mountie");
let jefferson = require("express-jefferson");
let path = require("path");
let debug = require("app/middleware/debug");

let app = jefferson.app({
    routes: {
        "/": {
            get: [ debug.send("auth root") ]
        }
    }
});

mountie({
    parent: app,
    src: path.join(__dirname, "methods"),
    prefix: (name) => `/${name}`
});

module.exports = app;

