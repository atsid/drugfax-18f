"use strict";
let jefferson = require("express-jefferson");
let debug = require("../../../middleware/debug");
let drugs = require("../../../middleware/drugs");
let cache = require("../../../middleware/cache");

module.exports = jefferson.router({
    proxies: [require("express-jefferson/proxies/promise-handler")],
    pre: {
        all: [cache({maxAge: 3600})]
    },
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
        },
        "/:splSetId/stats": {
            get: [drugs.getStatsBySplSetId]
        }
    }
});
