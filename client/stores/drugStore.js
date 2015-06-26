"use strict";

let request = require("superagent-bluebird-promise");

class DrugStore {

    list(opts) {
        let req = request.get("/api/drugs");
        req.query({limit: opts.limit || 100});
        req.query({skip: opts.skip || 0});
        if (opts.search) {
            req.query({search: opts.search});
        }
        return req.promise();
    }

    get(id) {
        return request.get(`/api/drugs/by-spl-set-id/${id}`).promise().then((res) => res.body);
    }
}

module.exports = DrugStore;
