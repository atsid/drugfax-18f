"use strict";
let persistence = require("../../persistence");
let NotAuthorizedError = require("../../errors/not_authorized");
let NotFoundError = require("../../errors/not_found");

module.exports = (req, res) => {
    let user = req.user;
    let subscriptionId = req.params.subscriptionId;

    return persistence.models.Subscription.findByIdQ(subscriptionId)
    .then((found) => {
            if (!found) {
                throw new NotFoundError("Could not find subscription");
            }
            if (`${found.user}` !== `${user.id}`) {
                throw new NotAuthorizedError("User is not authorized to view this subscription");
            }
            res.json(found.process());
        });
};
