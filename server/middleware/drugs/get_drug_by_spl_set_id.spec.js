"use strict";

// Does some generic testing
let baseTests = require("./base_drug_by_spl_set_id.spec");
baseTests("get_drug_by_spl_set_id", "label", "openfda.spl_set_id", true);
