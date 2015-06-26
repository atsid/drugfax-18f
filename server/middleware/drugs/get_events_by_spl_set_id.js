"use strict";
let drugs = require("./drugs_api");
let apiInvoker = require("./api_invoker");

module.exports = (req, res) => {
    let splSetId = req.params.splSetId;
    req.query.search = `patient.drug.openfda.spl_set_id="${splSetId}"`;

    return apiInvoker.buildRequest(drugs().events(), req).runRaw().pipe(res);
};
