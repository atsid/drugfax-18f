"use strict";
let User = require("app/persistence").models.User;
let NotFoundError = require("app/errors/not_found");

let create = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    return User.createQ({email, password}).then((user) => {
        res.status(201).json(user.process());
    });
};

let getById = (req, res) => {
    return User.findByIdQ(req.params.id).then((found) => {
        if (!found) {
            throw new NotFoundError(`Could not find user ${req.params.id}`);
        }
        res.json(found.process());
    });
};

let index = (req, res) => {
    res.json({
        options: ["POST"],
        links: {
            "user": "/users/{id}"
        }
    });
};

module.exports = {create, index, getById};
