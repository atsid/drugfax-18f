"use strict";
let debug = require("debug")("app:errors");

module.exports = (err, req, res, next) => {
    if (req.body.password) {
        delete req.body.password;
    }
    debug(`handling error on path ${req.url} with payload`, req.body);
    res.status(err.httpStatus || 500).send(err.message || "An error occurred with the services.");
    next();
};
