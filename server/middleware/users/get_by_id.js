"use strict";
let User = require("../../persistence").models.User;
let NotFoundError = require("../../errors/not_found");

module.exports = (req, res) => {
    return User.findByIdQ(req.params.id).then((found) => {
        if (!found) {
            throw new NotFoundError(`Could not find user ${req.params.id}`);
        }
        res.json(found.process());
    });
};
