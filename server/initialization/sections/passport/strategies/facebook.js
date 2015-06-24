"use strict";
let FacebookStrategy = require("passport-facebook").Strategy;
let persistence = require("app/persistence");
let User = persistence.models.User;
let config = require("config");
let debug = require("debug")("app:auth");
let hat = require("hat");

module.exports = () => {
    return new FacebookStrategy({
            clientID: config.auth.facebook.clientID,
            clientSecret: config.auth.facebook.clientSecret,
            callbackURL: config.auth.facebook.callbackUrl
        },
        (accessToken, refreshToken, profile, done) => {
            let email = profile.emails[0];
            User.findOneQ({email: email})
                .then((found) => found || User.createQ({email: email, password: hat()}))
                .then((user) => done(null, user))
                .catch((err) => {
                    debug("error authenticating with facebook");
                    done(err);
                });
        });
};
