"use strict";
var passwordChecker = require("../../../../components/password_checker");
let debug = require("debug")("app:models:user:encrypt_on_save");

module.exports = function (next) {
    let user = this,
        isPasswordModified = user.isModified("password");

    if (user.password && isPasswordModified) {
        debug("password change detected for ", user.email || user.name);
        passwordChecker.encryptPassword(user.password)
            .then((hash) => {
                user.password = hash;
                next();
            })
            .catch(err => next(err));
    } else {
        next();
    }
};
