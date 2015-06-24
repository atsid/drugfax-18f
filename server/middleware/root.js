"use strict";

let get = (req, res) => {
    let payload = {
        name: "ATS 18F Pool2 Submission",
        status: "ok",
        links: {
            auth: "/auth",
            users: "/users"
        }
    };
    res.json(payload);
    res.end();
};

module.exports = { get };
