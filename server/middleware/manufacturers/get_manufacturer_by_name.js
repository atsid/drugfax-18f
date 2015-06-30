"use strict";

let manufacturerStats = require("./manufacturer_stats");

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
    });
};
