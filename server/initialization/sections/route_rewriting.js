"use strict";

module.exports = {
    name: "route rewriting",
    configure(app) {
        app.get(/^(?!\/api|.*\.).*/, (req, res, next) => {
            req.url = "/index.html";
            next();
        });
    }
};

