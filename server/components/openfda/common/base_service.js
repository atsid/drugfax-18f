"use strict";

let OpenFDASearch = require("./search");
let request = require("superagent");


/**
 * Provides some base service pipings for all openfda services
 */
class OpenFDABaseService {

    /**
     * Constructor for the base service
     * @param {OpenFDAApi} api The parent api
     * @param {String} path The path relative to the parent api
     */
    constructor(api, path) {
        this.api = api;
        this.path = path;
        this.childSearch = new OpenFDASearch(this);
    }

    /**
     * Builds the final url to use to call the FDA services
     * @returns The final url
     */
    buildUrl() {
        let baseUrl = this.api.path + this.path;
        let search = this.childSearch.buildUrl();
        var apiKey = this.api.apiKey;

        let queryArgs = [];
        if (this.api.apiKey) {
            queryArgs.push("api_key=" + apiKey);
        }

        if (search) {
            // If the flag is enabled for sanitizing searches, sanitize it
            search = (this.api.options || {}).sanitizeSearch ? this._sanitizeSearch(search) : search;
            queryArgs.push("search=" + search);
        }

        if (this.limitArg) {
            queryArgs.push("limit=" + this.limitArg);
        }

        if (this.skipArg) {
            queryArgs.push("skip=" + this.skipArg);
        }

        if (this.countArg) {
            queryArgs.push("count=" + this.countArg);
        }

        return baseUrl + (queryArgs.length ? "?" + queryArgs.join("&") : "");
    }

    /**
     * Limits the number of results to the number provided
     * @param {number} num The number of results to return
     */
    limit(num) {
        this.limitArg = num;
        return this;
    }

    /**
     * Skips the number of results
     * @param {number} num The number of results to skip
     */
    skip(num) {
        this.skipArg = num;
        return this;
    }

    /**
     * Returns the number of unique results for the field
     * @param {field} field The field to count
     */
    count(field) {
        this.countArg = field;
        return this;
    }

    /**
     * The search for this service call
     */
    search(str) {
        return this.childSearch.search(str);
    }

    /**
     * Executes the service call
     * @returns A promise returning the service call result.
     */
    run() {
        return new Promise((resolve, reject) => {
            this.runRaw().end((err, res) => {
                if (res.ok) {
                    resolve(res.body);
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Executes the service call returning a streamable result
     * @returns A promise for the service call
     */
    runRaw() {
        var url = this.buildUrl();
        return request.get(url);
    }

    /**
     * Sanitizes the given value for use with the openfda API
     * @param value The value to sanitize
     */
    _sanitizeSearch(value) {
        // Certain characters seem to choke up the openFDA API even when escaped
        return value.replace(/[,']|(%2C)|(%27)/g, "");
    }
}

module.exports = OpenFDABaseService;
