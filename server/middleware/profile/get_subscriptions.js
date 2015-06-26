"use strict";
let persistence = require("../../persistence");

module.exports = (req, res) => {
    let userId = "" + req.user.id;

    let criteria = {user: userId};
    if (req.query.splSetId) {
        criteria.splSetId = req.query.splSetId;
    }
    return persistence.models.Subscription.findQ(criteria)
        .then((subscriptions) => {
            res.json({
                items: subscriptions.map((s) => s.process())
            });
        });
};
