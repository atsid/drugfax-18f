"use strict";

let OpenFDABaseService = require("../common/base_service");

/**
 * The drugs/events service
 */
class OpenFDADrugEnforcements extends OpenFDABaseService {

      /**
       * The constructor for the Enforcements Service
       * @param {OpenFDAApi} The API parent
       */
      constructor(api) {
          super(api, "/drug/enforcement.json");
      }
}

module.exports = OpenFDADrugEnforcements;
