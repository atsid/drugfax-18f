"use strict";
let jefferson = require("express-jefferson");
let mountie = require("express-mountie");
let debug = require("../../middleware/debug");
let path = require("path");

let router = jefferson.router({
    routes: {
        "/": {
            "get": [debug.send("NotImplemented - Get Drug Index")]
        }
    }
});

mountie({
    parent: router,
    src: path.join(__dirname, "routers"),
    prefix: (name) => `/${name}`
});
module.exports = router;
