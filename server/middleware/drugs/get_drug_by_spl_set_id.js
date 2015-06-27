"use strict";
let drugs = require("../../components/drugs_api");
let apiInvoker = require("../../components/api_invoker");

module.exports = (req, res) => {
    let splSetId = req.params.splSetId;
    req.query.search = `openfda.spl_set_id="${splSetId}"`;
    return apiInvoker.invoke(drugs(), req).then((result) => res.send(result.data[0]));
};
