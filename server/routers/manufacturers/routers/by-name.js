"use strict";
let jefferson = require("express-jefferson");
let manufacturers = require("../../../middleware/manufacturers");

module.exports = jefferson.router({
    proxies: [require("express-jefferson/proxies/promise-handler")],
    routes: {
        "/": {
            get: [manufacturers.getManufacturerByName]
        }
    }
});
