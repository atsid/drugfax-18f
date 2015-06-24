"use strict";
let jefferson = require("express-jefferson");
let passport = require("passport");
let redirect = require("../../../middleware/redirect");

module.exports = jefferson.router({
    routes: {
        "/": {
            get: [passport.authenticate("twitter")]
        },
        "/callback": {
            get: [
                passport.authenticate("twitter", {failureRedirect: "/#/login"}),
                redirect("/")
            ]
        }
    }
});
