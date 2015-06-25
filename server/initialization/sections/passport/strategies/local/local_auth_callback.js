"use strict";

let debug = require("debug")("app:auth");
var persistence = require("../../../../../persistence");
let User = persistence.models.User;

module.exports = (email, password, done) => {
    debug("authenticating user " + email);
    return User.findOneQ({email: email})
        .then((user) => {
            if (!user) {
                debug("could not find user -" + email);
                done(null, false);
            } else {
                return user.isValidPassword(password)
                    .then((isValid) => {
                        if (!isValid) {
                            debug("password not valid for user -" + email);
                        } else {
                            debug("authenticated user with password - " + email);
                        }
                        done(null, (isValid ? user : false));
                    });
            }
        })
        .catch((err) => {
            debug("error authenticating user", err);
            done(err);
        });
};
