"use strict";

let index = (req, res) => {
    res.json({
        methods: ["facebook"],
        links: {
            "facebook": "/auth/facebook"
        }
    });
    res.end();
};

let getCurrentUser = (req, res) => {
    if (!req.user) {
        res.status(404).json({message: "No authenticated user found"});
    } else {
        res.json(req.user);
    }
    res.end();
};

module.exports = {
    index,
    getCurrentUser
};
