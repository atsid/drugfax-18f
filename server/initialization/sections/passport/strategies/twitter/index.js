"use strict";
let config = require("config");
let TwitterStrategy = require("passport-twitter").Strategy;
let oauthCallback = require("./oauth_callback");

let twitterConfig = {
    consumerKey: config.auth.twitter.consumerKey,
    consumerSecret: config.auth.twitter.consumerSecret,
    callbackURL: config.auth.twitter.callbackURL
};
module.exports = new TwitterStrategy(twitterConfig, oauthCallback);
