"use strict";
let jefferson = require("express-jefferson");
let root = require("app/middleware/root");

let router = jefferson.router({
    routes: {
        "/": {
            get: [root.get]
        }
    }
});

module.exports = router;
