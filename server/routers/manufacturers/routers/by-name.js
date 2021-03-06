"use strict";
let jefferson = require("express-jefferson");
let manufacturers = require("../../../middleware/manufacturers");
let cache = require("../../../middleware/cache");

module.exports = jefferson.router({
    proxies: [require("express-jefferson/proxies/promise-handler")],
    pre: {
        all: [cache({maxAge: 3600})]
    },
    routes: {
        "/": {
            get: [manufacturers.getManufacturerByName]
        }
    }
});
