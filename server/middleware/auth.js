"use strict";

let index = (req, res) => {
    res.json({
        options: ["GET"],
        data: {
            methods: ["local", "facebook"]
        },
        links: {
            "current": "/auth/current",
            "local": "/auth/local",
            "facebook": "/auth/facebook"
        }
    });
    res.end();
};

let getCurrentUser = (req, res) => {
    if (!req.user) {
        res.status(404).json({message: "No authenticated user found"});
    } else {
        res.json(req.user.process());
    }
    res.end();
};

let logout = (req, res) => {
    req.logout();
    res.redirect("/");
};

module.exports = {
    index,
    logout,
    getCurrentUser
};
