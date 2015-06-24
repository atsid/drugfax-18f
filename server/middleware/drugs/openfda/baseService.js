let OpenFDASearch = require("./search");
let request = require('superagent');


/**
 * Provides some base service pipings for all openfda services
 */
class BaseService {

    constructor (api, path) {
        this.api = api;
        this.path = path;
        this.search = new OpenFDASearch(this);
    }

    buildUrl() {
        let baseUrl = this.api.path + this.path;
        let search = this.search.buildUrl();

        let queryArgs = [];
        if (search) {
            queryArgs.push("search=" + search);
        }

        if (this.limitArg) {
            queryArgs.push("limit=" + this.limitArg);
        }

        if (this.skipArg) {
            queryArgs.push("skip=" + this.skipArg);
        }

        return baseUrl + (queryArgs.length ? "?" + queryArgs.join("&") : "");
    }

    limit(num) {
        this.limitArg = num;
        return this;
    }

    skip(num) {
        this.skipArg = num;
        return this;
    }

    search() {
        return this.search;
    }

    run() {
        var url = this.buildUrl();
        return new Promise((resolve, reject) => {
            request.get(url).end((err, res) => {
                if (res.ok) {
                    resolve(res.body);
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = BaseService;
