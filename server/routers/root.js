"use strict";
let jefferson = require("express-jefferson");
let root = require("app/middleware/root");

module.exports = jefferson.app({
    routes: {
        "/": {
            get: [ root.get ]
        }
    }
});
