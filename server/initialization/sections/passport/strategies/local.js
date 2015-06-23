"use strict";
var LocalStrategy = require("passport-local").Strategy;
var persistence = require("app:persistence");
var debug = require("debug")("app:auth");

module.exports = () => {
    let User = persistence.models.User;
    return new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, (email, password, done) => {
        debug("authenticating user " + email);
        User.findOneQ({email: email})
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
                                done(null, (isValid ? user : false));
                            }
                        });
                }
            })
            .catch((err) => {
                debug("error authenticating user", err);
                done(err);
            });
    });
};
