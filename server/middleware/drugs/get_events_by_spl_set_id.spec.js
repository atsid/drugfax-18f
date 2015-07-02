"use strict";

// Does some generic testing
let baseTests = require("./base_drug_by_spl_set_id.spec");
baseTests("get_events_by_spl_set_id", "event", "patient.drug.openfda.spl_set_id");
