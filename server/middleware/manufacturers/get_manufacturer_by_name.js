"use strict";

let manufacturerStats = require("./manufacturer_stats");

/**
 * Gets a specific manufacturer by name
 */
module.exports = (req, res) => {
    let name = req.params.name;
    manufacturerStats(name)
        .then((data) => {
            res.json({
                name: name,
                stats: data
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({ error: "Unknown service error" });
        });
};
