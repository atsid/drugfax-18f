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
        let req = request.get("/api/drugs");
        req.query({search: `openfda.spl_set_id:"${id}"`});
        return req.promise();
    }
}

module.exports = DrugStore;
