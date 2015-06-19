"use strict";
let jefferson = require("express-jefferson");

module.exports = jefferson.app({
    routes: {
        "/": {
            get: [
                (req, res, next) => {
                    let payload = {
                        status: "ok"
                    };
                    res.json(payload);
                    next();
                }
            ]
        }
    }
});
