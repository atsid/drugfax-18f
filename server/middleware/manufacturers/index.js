"use strict";

let drugs = require("../../components/drugs_api");
let apiInvoker = require("../../components/api_invoker");
let OpenFDABadRequest = require("../../errors/openfda_bad_request");

let index = (req, res) => {
    let search = req.query.search;
    req.query.search = search ? search.replace("name", "openfda.manufacturer_name") : "";
    return apiInvoker.buildRequest(drugs(), req)
        .count("openfda.manufacturer_name.exact")
        .run()
        .then((resp) => {
            res.json({
                meta: apiInvoker.getMeta(resp),
                data: resp.results.map((item) => {
                    return {
                        id: item.term,
                        name: item.term
                    };
                })
            });
        })
        .catch((err) => {
            if (err.status === 404) {
                res.send(apiInvoker.EMPTY_RESULT);
            } else {
                throw new OpenFDABadRequest(err.response && err.response.body);
            }
        });
};


module.exports = {
    index,
    getManufacturerByName: require("./get_manufacturer_by_name")
};
