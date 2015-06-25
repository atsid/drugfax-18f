"use strict";
let drugs = require("./drugs_api");

module.exports = (req, res) => {
    let splSetId = req.params.splSetId;

    return drugs()
        .search(`openfda.spl_set_id="${splSetId}"`).parent()
        .limit(req.query.limit)
        .skip(req.query.skip)
        .run()
        .then((result) => res.send(result.results[0]));
};
