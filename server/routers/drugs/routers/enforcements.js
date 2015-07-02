"use strict";
let jefferson = require("express-jefferson");
let drugs = require("../../../middleware/drugs");

module.exports = jefferson.router({
    proxies: [require("express-jefferson/proxies/promise-handler")],
    routes: {
        "/": {
            get: [drugs.enforcements]
        }
    }
});
