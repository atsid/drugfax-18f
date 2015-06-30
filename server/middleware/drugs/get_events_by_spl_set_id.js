"use strict";
let drugs = require("../../components/drugs_api");
let apiInvoker = require("../../components/api_invoker");

module.exports = (req, res) => {
    req.query.search = `patient.drug.openfda.spl_set_id="${req.params.splSetId}"`;
    return apiInvoker.middleware(drugs().events(), req, res);
};
