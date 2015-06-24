"use strict";
let config = require("config");
let TwitterStrategy = require("passport-twitter").Strategy;
let User = require("../../../../../persistence").models.User;
let debug = require("debug")("app:auth");
let convert = require("./convert_twitter_profile");

module.exports = () => {
    return new TwitterStrategy({
            consumerKey: config.auth.twitter.consumerKey,
            consumerSecret: config.auth.twitter.consumerSecret,
            callbackURL: config.auth.twitter.callbackURL
        },
        function(token, tokenSecret, profile, done) {
            debug("Authenticating Twitter Profile: " + profile.id, profile);
            User.findOneQ({ twitterId: "" + profile.id })
                .then((found) => found || User.createQ(convert(profile)))
                .then((user) => done(null, user))
                .catch((err) => {
                    debug("error authenticating via twitter", err);
                    done(err);
                });
        }
    );
};
