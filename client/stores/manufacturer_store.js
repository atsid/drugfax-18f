"use strict";

let request = require("superagent-bluebird-promise");
let BaseStore = require("./base_store");

class ManufacturerStore extends BaseStore {

    list(opts={}, noErrorHandling) {
        let req = request.get("/api/manufacturers");
        req.query({limit: opts.limit || 100});
        req.query({skip: opts.skip || 0});
        if (opts.search) {
            req.query({search: opts.search});
        }
        if (opts.fields) {
            req.query({fields: opts.fields});
        }
        let promise = req.promise();
        if (!noErrorHandling) {
            promise.catch(this.errorHandler.bind(this, "Could not load manufacturer list: "));
        }
        return promise;
    }

    get(name) {
        return request.get("/api/manufacturers/by-name")
            .query({ "name": name })
            .promise()
            .then((res) => res.body)
            .catch(this.errorHandler.bind(this, "Could not load manufacturer \"" + name + "\": "));
    }

    /**
     * Returns a list of matching manufacturers by the given name
     */
    listByName(name, skip=0, limit=100) {
        let qs = `name:${name}`;
        return this.list({search: qs, limit: limit, skip: skip}, true)
        .then((res) => {
            let data = res.body.data;
            return { data: data, total: data.length };
        }, (err) => {
            if (err && err.name !== "CancellationError") {
                this.errorHandler("Could not load manufacturer \"" + name + "\": ", err);
                return { data: null };
            }
        });
    }
}

module.exports = ManufacturerStore;
