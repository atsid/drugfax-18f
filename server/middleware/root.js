"use strict";

let get = (req, res, next) => {
    let payload = {
        status: "ok"
    };
    res.json(payload);
    next();
};

module.exports = { get };
