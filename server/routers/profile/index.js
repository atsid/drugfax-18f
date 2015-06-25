"use strict";
let jefferson = require("express-jefferson");
let mountie = require("express-mountie");
let auth = require("../../middleware/auth");
let path = require("path");

let router = jefferson.router({
    routes: {
        "/": {
            "get": [
                auth.assertLoggedIn,
                auth.getCurrentUser
            ]
        }
    }
});

mountie({
    parent: router,
    src: path.join(__dirname, "routers"),
    prefix: (name) => `/${name}`
});
module.exports = router;
