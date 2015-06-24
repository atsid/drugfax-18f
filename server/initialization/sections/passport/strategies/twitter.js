"use strict";
let config = require("config");
let TwitterStrategy = require("passport-twitter").Strategy;
let User = require("../../../../persistence").models.User;
let debug = require("debug")("app:auth");
let hat = require("hat");

let createUserObject = (twitterProfile) => {
    return {
        twitterId: twitterProfile.id,
        email: twitterProfile.username + "@twitter.com",
        password: hat()
    };
};

module.exports = () => {
    return new TwitterStrategy({
            consumerKey: config.auth.twitter.consumerKey,
            consumerSecret: config.auth.twitter.consumerSecret,
            callbackURL: config.auth.twitter.callbackURL
        },
        function(token, tokenSecret, profile, done) {
            debug("Authenticating Twitter Profile", profile);
            User.findOneQ({ twitterId: "" + profile.id })
                .then((found) => found || User.createQ(createUserObject(profile)))
                .then((user) => done(null, user))
                .catch((err) => {
                    debug("error authenticating via twitter", err);
                    done(err);
                });
        }
    );
};
