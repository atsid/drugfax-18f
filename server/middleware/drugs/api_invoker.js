"use strict";
let debug = require("debug")("app:middleware:openfda_invoker");
let applyFields = require("./apply_fields");

const EMPTY_RESULT = {
    meta: {
        total: 0
    },
    data: []
};

/**
 * Performs a simple api call, and does some extra processing to handle fields
 * @param {OpenFDABaseService} api The service to use
 * @param {Request} req The request
 * @param {Result} res The result
 */
let doApiCall = (api, req, res) => {
    api
        .search(req.query.search).parent()
        .limit(req.query.limit)
        .skip(req.query.skip)
        .run()
        .then((resp) => {
            var data = resp.results;
            if (req.query.fields) {
                let fieldsMap = {};
                req.query.fields.split(",").forEach((field) => {
                    fieldsMap[field.trim()] = true;
                });
                data = data.map((result) => applyFields(fieldsMap, result));
            }

            let resultMeta = (resp.meta && resp.meta.results) || {};
            res.json({
                meta: {
                    limit: resultMeta.limit,
                    skip: resultMeta.skip,
                    total: resultMeta.total
                },
                data: data
            });
            res.end();
        }, (err) => {
            if (err.status === 404) {
                res.json(EMPTY_RESULT);
            } else {
                debug(err);
                res.json({ error: "Unknown service error" });
                res.end();
            }
        });
};

module.exports = {
    invoke: doApiCall
};
