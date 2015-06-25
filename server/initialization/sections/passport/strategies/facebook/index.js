"use strict";
let FacebookStrategy = require("passport-facebook").Strategy;
let config = require("config");
let oauthCallback = require("./oauth_callback");

let fbConfig = {
    clientID: config.auth.facebook.clientID,
    clientSecret: config.auth.facebook.clientSecret,
    callbackURL: config.auth.facebook.callbackUrl
};

module.exports = new FacebookStrategy(fbConfig, oauthCallback);
