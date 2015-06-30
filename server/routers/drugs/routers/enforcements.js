"use strict";
let jefferson = require("express-jefferson");
let drugs = require("../../../middleware/drugs");

module.exports = jefferson.router({
    routes: {
        "/": {
            get: [drugs.enforcements]
        }
    }
});
