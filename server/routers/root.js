"use strict";
let jefferson = require("express-jefferson");
let root = require("app/middleware/root");

let app = jefferson.app({
    routes: {
        "/": {
            get: [ root.get ]
        }
    }
});

module.exports = app;
