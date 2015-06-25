"use strict";
let jefferson = require("express-jefferson");
let debug = require("../../../middleware/debug");

module.exports = jefferson.router({
    routes: {
        "/": {
            get: [debug.send("NotImplemented - send an index (no data)")]
        },
        "/:splSetId": {
            get: [debug.send("NotImplemented - Get Get Drug By SPL Set Id")]
        }
    }
});
