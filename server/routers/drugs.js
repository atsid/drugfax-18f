"use strict";
let jefferson = require("express-jefferson");
let drugs = require("../middleware/drugs/drugs");
module.exports = jefferson.router({
    routes: {
        "/": {
            get: [drugs.index]
        },
        "/events": {
            get: [drugs.events]
        }
    }
});
