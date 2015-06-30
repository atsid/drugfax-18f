"use strict";
let request = require("superagent-bluebird-promise");

class DrugStore {

    list(opts={}) {
        let req = request.get("/api/drugs");
        req.query({
            skip: opts.skip || 0,
            limit: opts.limit || 25
        });
        if (opts.search) {
            req.query({search: opts.search});
        }
        if (opts.fields) {
            req.query({fields: opts.fields});
        }
        return req.promise();
    }

    /**
     * Returns a list of matching drugs by the given name
     */
    listByName(name, skip=0, limit=50) {
        let qs = `openfda.brand_name:${name}+OR+openfda.substance_name:${name}+OR+openfda.manufacturer_name:${name}`;
        return this.list({search: qs, skip: skip, limit: limit}).then((res) => {
            return { data: res.body.data, total: res.body.meta.total };
        }, (err) => {
            if (err && err.name !== "CancellationError") {
                return { data: null };
            }
        });
    }

    get(id) {
        return request.get(`/api/drugs/by-spl-set-id/${id}`).promise().then((res) => res.body);
    }
}

module.exports = DrugStore;
