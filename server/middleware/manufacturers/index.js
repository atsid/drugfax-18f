"use strict";

let drugs = require("../drugs/drugs_api");

let index = (req, res) => {
    let search = req.query.search;
    drugs()
        .limit(req.query.limit)
        .skip(req.query.skip)
        .search(search ? search.replace("name", "openfda.manufacturer_name") : "").parent()
        .count("openfda.manufacturer_name.exact")
        .run()
        .then((resp) => {
            let resultMeta = (resp.meta && resp.meta.results) || {};
            res.json({
                meta: {
                    limit: resultMeta.limit,
                    skip: resultMeta.skip,
                    total: resultMeta.total
                },
                data: resp.results.map((item) => {
                    return {
                        id: item.term,
                        name: item.term,
                        drugCount: item.count
                    };
                })
            });
        }, (err) => {
            console.log(err);
            res.json({ error: "Unknown service error" });
        });
};

module.exports = {
    index
};
