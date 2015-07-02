"use strict";

let manufacturerStats = require("./manufacturer_stats");
let OpenFDABadRequest = require("../../errors/openfda_bad_request");

/**
 * Gets a specific manufacturer by name
 */
module.exports = (req, res) => {
    let name = req.query.name;
    return manufacturerStats(name).then((data) => {
        res.json({
            name: name,
            stats: data
        });
    })
    .catch((err) => {
        if (err.status === 404) {
            res.send({});
        } else {
            throw new OpenFDABadRequest(err.response && err.response.body);
        }
    });
};
