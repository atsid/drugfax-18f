"use strict";
let persistence = require("../../persistence");

module.exports = (req, res) => {
    let userId = "" + req.user.id;
    return persistence.models.Subscription.findQ({user: userId})
        .then((subscriptions) => {
            res.json({
                items: subscriptions.map((s) => s.process)
            });
        });
};
