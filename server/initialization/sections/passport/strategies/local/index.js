"use strict";
var LocalStrategy = require("passport-local").Strategy;
let localCallback = require("./local_auth_callback");
let localConfig = {
    usernameField: "email",
    passwordField: "password"
};
module.exports = new LocalStrategy(localConfig, localCallback);
