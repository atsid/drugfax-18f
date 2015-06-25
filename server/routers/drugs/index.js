"use strict";
let jefferson = require("express-jefferson");
let mountie = require("express-mountie");
let path = require("path");
let drugs = require("../../middleware/drugs");

let router = jefferson.router({
    routes: {
        "/": {
            "get": [drugs.index]
        }
    }
});

mountie({
    parent: router,
    src: path.join(__dirname, "routers"),
    prefix: (name) => `/${name}`
});
module.exports = router;
