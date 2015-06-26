"use strict";
let jefferson = require("express-jefferson");
let debug = require("../../../middleware/debug");
let manufacturers = require("../../../middleware/manufacturers");

module.exports = jefferson.router({
    routes: {
        "/:name": {
            get: [manufacturers.getManufacturerByName]
        }
    }
});
