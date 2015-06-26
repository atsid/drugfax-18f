"use strict";
let jefferson = require("express-jefferson");
let debug = require("../../../middleware/debug");
let manufacturers = require("../../../middleware/manufacturers");

module.exports = jefferson.router({
    routes: {
        "/": {
            get: [debug.send("NotImplemented - send an index (no data)")]
        },
        "/:name": {
            get: [manufacturers.getManufacturerByName]
        }
    }
});
