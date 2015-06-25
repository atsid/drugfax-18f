"use strict";

module.exports = (req, res) => {
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
