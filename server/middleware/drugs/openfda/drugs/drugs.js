"use strict";

let OpenFDADrugEvents = require("./events");
let OpenFDABaseService = require("../common/baseService");

/**
 * The drugs/labels service
 */
class OpenFDADrugs extends OpenFDABaseService {

    /**
     * The constructor for the Drugs Service
     * @param {OpenFDAApi} The API parent
     */
    constructor(api) {
        super(api, "/drug/label.json");
    }

    /**
     * Gets a reference to the events service
     */
    events() {
        return new OpenFDADrugEvents(this.api);
    }
}

module.exports = OpenFDADrugs;
