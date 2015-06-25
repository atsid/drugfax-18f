"use strict";

let apiFactory = require("./openfda/api");
let config = require("config");

/**
 * Finds all props in the given map that start with the given string
 * @param {Map[String]} map The string map
 * @param {String} startString The string to search for
 */
let getPropsThatStartWith = (map, startString) => {
    let finalMap = {};
    let count = 0;
    for (let key in map) {
        if (key.startsWith(startString)) {
            finalMap[key.replace(startString, "")] = true;
            count++;
        }
    }
    return {
        map: finalMap,
        count: count
    };
};

/**
 * Applies the given field map to the result, returning only fields that are in the field map
 */
let applyFields = (map, result) => {
    let final = {};
    for (let key in result) {
        if (result.hasOwnProperty(key)) {
            let type = typeof result[key];
            if (map[key]) {
                final[key] = result[key];
            } else if (type === "object") {
                let props = getPropsThatStartWith(map, key + ".");
                if (props.count) {
                    final[key] = applyFields(props.map, result[key]);
                }
            }
        }
    }
    return final;
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
                res.json({
                    meta: {
                        total: 0
                    },
                    data: []
                });
            } else {
                console.error(err);
                res.json({ error: "Unknown service error" });
                res.end();
            }
        });
};

let apiKey = config.openfda && config.openfda.apiKey;
let index = (req, res) => doApiCall(apiFactory(apiKey).drugs(), req, res);
let events = (req, res) => doApiCall(apiFactory(apiKey).drugs().events(), req, res);

module.exports = {
    index,
    events
};
