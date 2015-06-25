"use strict";

let OpenFDADrugs = require("./drugs/drugs.js");

/**
 * Wrapper around the open FDA api
 */
class OpenFDAAPI {

    /**
     * Constructor for the API
     * @param {String} apiKey The api key to use
     * @param {String} path The path to the base fda API
     */
    constructor(apiKey, path) {
        this.path = path || "https://api.fda.gov";
        this.apiKey = apiKey;
    }

    /**
     * Returns the drug api
     */
    drugs() {
        return new OpenFDADrugs(this);
    }
}

module.exports = function(apiKey, path) {
    return new OpenFDAAPI(apiKey, path);
};
