"use strict";
let jefferson = require("express-jefferson");
let debug = require("../../../middleware/debug");
let drugs = require("../../../middleware/drugs");

module.exports = jefferson.router({
    routes: {
        "/": {
            get: [debug.send("NotImplemented - send an index (no data)")]
        },
        "/:splSetId": {
            get: [drugs.getDrugBySplSetId]
        },
        "/:splSetId/events": {
            get: [drugs.getEventsBySplSetId]
        },
        "/:splSetId/enforcements": {
            get: [drugs.getEnforcementsBySplSetId]
        }
    }
});
