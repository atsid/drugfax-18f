"use strict";
let jefferson = require("express-jefferson");
let users = require("app/middleware/users");

module.exports = jefferson.router({
    proxies: [require("express-jefferson/proxies/promise-handler")],
    routes: {
        "/": {
            get: [users.index],
            post: [users.create]
        },
        "/:id": {
            get: [users.getById]
        }
    }
});
