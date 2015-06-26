"use strict";
let persistence = require("../../persistence");
let BadRequestError = require("../../errors/bad_request");
let Subscription = persistence.models.Subscription;


module.exports = (req, res) => {
    if (!(req.body && req.body.splSetId)) {
        throw new BadRequestError("'splSetId' must be present on the request body");
    }

    let data = {
        user: req.user.id,
        splSetId: req.body.splSetId
    };

    return Subscription.findOneQ(data)
        .then((result) => result || Subscription.createQ(data))
        .then((result) => res.status(201).json(result.process()));
};
