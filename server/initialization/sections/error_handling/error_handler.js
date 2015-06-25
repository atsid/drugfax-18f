"use strict";
let debug = require("debug")("app:errors");

module.exports = (err, req, res, next) => {
    if (req.body && req.body.password) {
        delete req.body.password;
    }
    debug(`handling error on path ${req.url} with payload`, req.body, err, err.stack);

    let statusCode = err.httpStatus || 500;
    let message = err.message || "An error occurred with the services.";
    res.status(statusCode).send(message);
    next();
};
