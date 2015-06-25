"use strict";
let persistence = require("../../persistence");

module.exports = (req, res) => {
    let splSetId = req.body.splSetId;
    let userId = req.user.id;

    let data = {
        user: userId,
        splSetId: splSetId
    };
    console.log("SUBSCRIPTION DATA: ", data);
    return persistence.models.Subscription.createQ(data)
        .then((created) => res.status(201).json(created.process()));
};
