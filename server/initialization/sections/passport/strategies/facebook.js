"use strict";
let FacebookStrategy = require("passport-facebook").Strategy;
let persistence = require("../../../../persistence");
let User = persistence.models.User;
let config = require("config");
let debug = require("debug")("app:auth");
let hat = require("hat");

let createUserObject = (facebookProfile) => {
    return {
        name: facebookProfile.displayName,
        facebookId: facebookProfile.id,
        password: hat()
    };
};

module.exports = () => {
    return new FacebookStrategy({
            clientID: config.auth.facebook.clientID,
            clientSecret: config.auth.facebook.clientSecret,
            callbackURL: config.auth.facebook.callbackUrl
        },
        (accessToken, refreshToken, profile, done) => {
            debug("Authenticating Facebook User: " + profile.id, profile);
            User.findOneQ({facebookId: profile.id})
                .then((found) => found || User.createQ(createUserObject(profile)))
                .then((user) => done(null, user))
                .catch((err) => {
                    debug("error authenticating with facebook");
                    done(err);
                });
        });
};
