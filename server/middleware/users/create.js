"use strict";
let User = require("../../persistence").models.User;

module.exports = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    return User.createQ({email, password}).then((user) => {
        res.status(201).json(user.process());
    });
};
