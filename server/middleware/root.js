"use strict";

let get = (req, res, next) => {
    let payload = {
        name: "ATS 18F Pool2 Submission",
        status: "ok",
        links: {
            auth: "/auth"
        }
    };
    res.json(payload);
    next();
};

module.exports = { get };
