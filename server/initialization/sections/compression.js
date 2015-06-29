"use strict";
let compression = require("compression");

module.exports = {
    name: "compression",
    configure(app) {
        app.use(compression());
    }
};
