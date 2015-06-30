"use strict";

let request = require("superagent-bluebird-promise");

class ManufacturerStore {

    list(opts={}) {
        let req = request.get("/api/manufacturers");
        req.query({limit: opts.limit || 100});
        req.query({skip: opts.skip || 0});
        if (opts.search) {
            req.query({search: opts.search});
        }
        if (opts.fields) {
            req.query({fields: opts.fields});
        }
        return req.promise();
    }

    get(name) {
        return request.get("/api/manufacturers/by-name")
            .query({"name": name})
            .promise().then((res) => res.body);
    }
}

module.exports = ManufacturerStore;
