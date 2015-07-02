"use strict";
let drugs = require("../../components/drugs_api");
let apiInvoker = require("../../components/api_invoker");
let OpenFDABadRequest = require("../../errors/openfda_bad_request");

module.exports = (req, res) => {
    let splSetId = req.params.splSetId;
    req.query.search = `openfda.spl_set_id="${splSetId}"`;
    return apiInvoker.invoke(drugs(), req)
        .then((result) => res.send(result.data[0]))
        .catch((err) => {
            if (err.status === 404) {
                res.send(apiInvoker.EMPTY_RESULT);
            } else {
                console.log(err);
                throw new OpenFDABadRequest(err.response && err.response.body);
            }
        });
};
