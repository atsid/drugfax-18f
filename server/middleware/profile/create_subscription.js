"use strict";
let persistence = require("../../persistence");

module.exports = (req, res) => {
    let splSetId = req.body.spl_set_id;
    let userId = req.user.id;

    return persistence.models.Subscription.createQ({
        user: userId,
        splSetId: splSetId
    }).then((created) => res.status(201).json(created));
};
