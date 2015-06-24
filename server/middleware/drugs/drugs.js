"use strict";

let api = new (require("./openfda/api"));

/**
 * Finds all props in the given map that start with the given string
 * @param {Map[String]} map The string map
 * @param {String} startString The string to search for
 */
let getPropsThatStartWith = (map, startString) => {
    let finalMap = {};
    let count = 0;
    for (var key in map) {
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
    for (var key in result) {
        if (result.hasOwnProperty(key)) {
            var type = typeof result[key];
            if (map[key]) {
                final[key] = result[key];
            } else if (type === "object") {
                var props = getPropsThatStartWith(map, key + ".");
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
        .limit(req.query.limit)
        .skip(req.query.skip)
        .run()
        .then((resp) => {
            var result;
            if (req.query.fields) {
                let fieldsMap = {};
                req.query.fields.split(",").forEach((field) => {
                    fieldsMap[field] = true;
                });
                var resultMeta = (resp.meta && resp.meta.results) || {};
                result = {
                    meta: {
                        limit: resultMeta.limit,
                        skip: resultMeta.skip,
                        total: resultMeta.total
                    },
                    data: resp.results.map((result) => applyFields(fieldsMap, result))
                };
            } else {
                result = resp;
            }
            res.json(result);
            res.end();
        }, (err) => {
            res.json({ error: "Unknown service error" });
            res.end();
        });
};

let index = doApiCall.bind(this, api.drugs());
let events = doApiCall.bind(this, api.drugs().events());

module.exports = {
    index,
    events
};
