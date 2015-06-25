"use strict";
let persistence = require("../../persistence");
let NotAuthorizedError = require("../../errors/not_authorized");

module.exports = (req, res) => {
    let user = req.user;
    let subscriptionId = req.params.subscriptionId;

    return persistence.models.Subscription.findByIdQ(subscriptionId)
    .then((found) => {
            if (`${found.user}` !== user) {
                throw new NotAuthorizedError("User is not authorized to view this subscription");
            }
            res.json(found.process());
        });
};
