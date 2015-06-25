"use strict";
let persistence = require("../../persistence");
let BadRequestError = require("../../errors/bad_request");

module.exports = (req, res) => {
    if (!(req.body && req.body.splSetId)) {
        throw new BadRequestError("'splSetId' must be present on the request body");
    }

    let data = {
        user: req.user.id,
        splSetId: req.body.splSetId
    };
    return persistence.models.Subscription.createQ(data)
        .then((created) => res.status(201).json(created.process()));
};
