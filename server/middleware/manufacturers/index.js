"use strict";

let drugs = require("../../components/drugs_api");
let apiInvoker = require("../../components/api_invoker");

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
        });
};


module.exports = {
    index,
    getManufacturerByName: require("./get_manufacturer_by_name")
};
