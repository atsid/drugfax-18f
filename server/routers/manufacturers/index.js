"use strict";
let jefferson = require("express-jefferson");
let manufacturers = require("../../middleware/manufacturers");
let mountie = require("express-mountie");
let path = require("path");
let cache = require("../../middleware/cache");

let router = jefferson.router({
    pre: {
        all: [cache({maxAge: 3600})]
    },
    routes: {
        "/": {
            "get": [manufacturers.index]
        }
    }
});

mountie({
    parent: router,
    src: path.join(__dirname, "routers"),
    prefix: (name) => `/${name}`
});

module.exports = router;
