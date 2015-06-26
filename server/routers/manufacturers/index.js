"use strict";
let jefferson = require("express-jefferson");
let manufacturers = require("../../middleware/manufacturers");

let router = jefferson.router({
    routes: {
        "/": {
            "get": [manufacturers.index]
        }
    }
});

module.exports = router;
