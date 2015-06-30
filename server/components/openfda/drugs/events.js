"use strict";

let OpenFDABaseService = require("../common/base_service");

/**
 * The Drug/Events Service
 */
class OpenFDADrugsEvents extends OpenFDABaseService {
    /**
     * The constructor for the Events Service
     * @param {OpenFDAApi} The API parent
     */
    constructor(api) {
        super(api, "/drug/event.json");
    }
}

module.exports = OpenFDADrugsEvents;
