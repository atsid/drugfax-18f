"use strict";
let config = require("config");
let TwitterStrategy = require("passport-twitter").Strategy;
let User = require("../../../../persistence").models.User;
let debug = require("debug")("app:auth");

module.exports = () => {
    new TwitterStrategy({
            consumerKey: config.auth.twitter.consumerKey,
            consumerSecret: config.auth.twitter.consumerSecret,
            callbackURL: config.auth.twitter.callbackURL
        },
        function(token, tokenSecret, profile, done) {
            debug("Authenticating Twitter Profile", profile);
            User.findOrCreate({ twitterId: "" + profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    )
};
