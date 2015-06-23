"use strict";
let jefferson = require("express-jefferson");
let passport = require("passport");
let auth = require("app/middleware/auth");

module.exports = jefferson.app({
    routes: {
        "/": {
            post: [
                passport.authenticate("local"),
                auth.getCurrentUser
            ]
        }
    }
});
