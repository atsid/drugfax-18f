"use strict";
let drugs = require("../../components/drugs_api");
let apiInvoker = require("../../components/api_invoker");

module.exports = (req, res) => {
    let splSetId = req.params.splSetId;
    req.query.search = `patient.drug.openfda.spl_set_id="${splSetId}"`;

    return apiInvoker.buildRequest(drugs().events(), req).runRaw().pipe(res);
};
