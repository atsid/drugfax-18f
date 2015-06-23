"use strict";
let passport = require("passport");
let config = require("config");

module.exports = {
    name: "passport",
    configure(app) {
        app.use(passport.initialize());
    }
};


