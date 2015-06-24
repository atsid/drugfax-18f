"use strict";
let jefferson = require("express-jefferson");
let passport = require("passport");

module.exports = jefferson.router({
    routes: {
        "/": {
            get: [passport.authenticate("twitter")]
        },
        "/callback": {
            get: [passport.authenticate("twitter", {failureRedirect: "/"})]
        }
    }
});
