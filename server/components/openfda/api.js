"use strict";

let OpenFDADrugs = require("./drugs/drugs.js");

const DEFAULT_OPTIONS = {
    // Some characters like , or ' screw up the FDA search, this will remove those before a search is performed
    sanitizeSearch: false
};

/**
 * Wrapper around the open FDA api
 */
class OpenFDAAPI {

    /**
     * Constructor for the API
     * @param {object} options The options for some of the api methods
     * @param {String} apiKey The api key to use
     * @param {String} path The path to the base fda API
     */
    constructor(options, apiKey, path) {
        this.path = path || "https://api.fda.gov";
        this.apiKey = apiKey;
        this.options = Object.assign({}, DEFAULT_OPTIONS, options || {});
    }

    /**
     * Returns the drug api
     */
    drugs() {
        return new OpenFDADrugs(this);
    }
}

module.exports = function(options, apiKey, path) {
    return new OpenFDAAPI(options, apiKey, path);
};
