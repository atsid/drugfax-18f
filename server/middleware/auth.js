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

module.exports = {
    index
};
