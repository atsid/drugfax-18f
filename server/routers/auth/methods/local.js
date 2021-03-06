"use strict";
let jefferson = require("express-jefferson");
let passport = require("passport");
let auth = require("../../../middleware/auth");

module.exports = jefferson.router({
    routes: {
        "/": {
            post: [
                passport.authenticate("local"),
                auth.getCurrentUser
            ]
        }
    }
});
