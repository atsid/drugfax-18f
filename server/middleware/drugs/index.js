"use strict";
let drugs = require("./drugs_api");
let invoker = require("./api_invoker");

let index = (req, res) => invoker.invoke(drugs(), req, res);
let events = (req, res) => invoker.invoke(drugs().events(), req, res);

module.exports = {
    index,
    events,
    getDrugBySplSetId: require("./get_drug_by_spl_set_id")
};
