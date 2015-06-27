"use strict";
let drugs = require("../../components/drugs_api");
let invoker = require("../../components/api_invoker");

let index = (req, res) => invoker.middleware(drugs(), req, res);
let events = (req, res) => invoker.middleware(drugs().events(), req, res);

module.exports = {
    index,
    events,
    getDrugBySplSetId: require("./get_drug_by_spl_set_id"),
    getEventsBySplSetId: require("./get_events_by_spl_set_id"),
    getEnforcementsBySplSetId: require("./get_enforcements_by_spl_set_id")
};
