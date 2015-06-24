"use strict";
let FacebookStrategy = require("passport-facebook").Strategy;
let persistence = require("../../../../persistence");
let User = persistence.models.User;
let config = require("config");
let debug = require("debug")("app:auth");
let hat = require("hat");

let createUserObject = (facebookProfile) => {
    return {
        name: {
            first: facebookProfile.firstName,
            last: facebookProfile.lastName
        },
        email: facebookProfile.emails[0],
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
            debug("Authenticating Facebook User", profile);
            User.findOneQ({facebookId: profile.id})
                .then((found) => {
                    if (found) {
                        return done(null, found);
                    }
                    return User.findOneQ({email: profile.emails[0]})
                        .then((foundByEmail) => foundByEmail || User.createQ(createUserObject(profile)))
                        .then((user) => done(null, user))
                        .catch((err) => {
                            debug("error authenticating with facebook");
                            done(err);
                        });
                });
        });
};
