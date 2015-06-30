"use strict";
let persistence = require("../../persistence");
let NotAuthorizedError = require("../../errors/not_authorized");
let NotFoundError = require("../../errors/not_found");
let Subscription = persistence.models.Subscription;

module.exports = (req, res) => {
    let user = req.user;
    let subscriptionId = req.params.subscriptionId;

    return Subscription.findByIdQ(subscriptionId)
        .then((found) => {
            if (!found) {
                throw new NotFoundError("Subscription could not be found");
            }
            if (`${found.user}` !== `${user.id}`) {
                throw new NotAuthorizedError(`User is not authorized to view this subscription, ${found.user} !== ${user.id}`);
            }
        })
        .then(() => Subscription.findByIdAndRemoveQ(subscriptionId))
        .then(() => res.status(204).send());
};
