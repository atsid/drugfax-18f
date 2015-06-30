"use strict";
var passwordChecker = require("../../../../components/password_checker");
let debug = require("debug")("app:models:user:encrypt_on_save");
let Bluebird = require("bluebird");

module.exports = function (next) {
    let user = this,
        isPasswordModified = user.isModified("password");

    if (user.password && isPasswordModified) {
        debug("password change detected for ", user.email || user.name);
        Bluebird.resolve(true)
            .then(() => passwordChecker.encryptPassword(user.password))
            .then((hash) => user.password = hash)
            .then(next)
            .catch(err => next(err));
    } else {
        next();
    }
};
