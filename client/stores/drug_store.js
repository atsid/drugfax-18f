"use strict";
let request = require("superagent-bluebird-promise");
let BaseStore = require("./base_store");

class DrugStore extends BaseStore {

    _applyBaseParams(req, opts) {
        req.query({
            skip: opts.skip || 0,
            limit: opts.limit || 25
        });
        if (opts.fields) {
            req.query({fields: opts.fields});
        }
    }

    list(opts={}, noErrorHandling) {
        let req = request.get("/api/drugs");
        this._applyBaseParams(req, opts);
        if (opts.search) {
            req.query({search: opts.search});
        }
        let promise = req.promise();
        if (!noErrorHandling) {
            promise.catch(this.errorHandler.bind(this, "Could not load drug list: "));
        }
        return promise;
    }

    /**
     * Returns a list of matching drugs by the given name
     */
    listByName(name, skip=0, limit=50) {
        let qs = `openfda.brand_name:${name}+OR+openfda.substance_name:${name}+OR+openfda.manufacturer_name:${name}`;
        return this.list({search: qs, skip: skip, limit: limit}, true).then((res) => {
            return { data: res.body.data, total: res.body.meta.total };
        }, (err) => {
            if (err && err.name !== "CancellationError") {
                this.errorHandler("Could not load drug \"" + name + "\": ", err);
                return { data: null };
            }
        });
    }

    get(id) {
        return request.get(`/api/drugs/by-spl-set-id/${id}`).then(res => res.body).catch(this.errorHandler.bind(this, "Could not load drug: "));
    }

    getEventCounts(id, startDate, endDate) {
        let req = request.get("/api/drugs/events");
        req.query({
            search: `receivedate:[${startDate}+TO+${endDate}]+AND+patient.drug.openfda.spl_set_id:"${id}"`,
            count: "receivedate"
        });
        return req.then(res => res.body.data).catch(this.errorHandler.bind(this, "Could not load adverse drug events: "));
    }

    getEnforcementCounts(id) {
        let req = request.get("/api/drugs/enforcements");
        req.query({
            search: `openfda.spl_set_id:"${id}"`,
            count: "openfda.spl_set_id.exact"
        });
        return req.then(res => res.body.data).catch(this.errorHandler.bind(this, "Could not load adverse drug enforcements: "));
    }

    getDrugStats(id) {
        let req = request.get(`/api/drugs/by-spl-set-id/${id}/stats`);
        return req.then(res => res.body).catch(this.errorHandler.bind(this, "Could not load adverse drug enforcements: "));
    }
}

module.exports = DrugStore;
