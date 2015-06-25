"use strict";
let jefferson = require("express-jefferson");
let debug = require("../middleware/debug");

let router = jefferson.router({
    routes: {
        "/drugs": {
            post: [debug.send("Not Implemented - Search Drugs")]
        }
    }
});

module.exports = router;
