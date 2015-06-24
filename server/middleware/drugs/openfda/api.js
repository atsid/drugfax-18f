let OpenFDADrugs = require("./drugs/drugs.js");

/**
 * Wrapper around the open FDA api
 */
class OpenFDAAPI {
    constructor(path) {
        this.path = path || "https://api.fda.gov";
    }

    /**
     * Returns the drug api
     */
    drugs() {
        return new OpenFDADrugs(this);
    }
}

module.exports = OpenFDAAPI;
