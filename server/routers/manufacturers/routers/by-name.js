"use strict";
let jefferson = require("express-jefferson");
let manufacturers = require("../../../middleware/manufacturers");

module.exports = jefferson.router({
    routes: {
        "/:name": {
            get: [manufacturers.getManufacturerByName]
        }
    }
});
