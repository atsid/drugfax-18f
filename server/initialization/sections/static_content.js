"use strict";
let bodyParser = require("body-parser");
let debug = require("debug")("app:init:static_content");
let path = require("path");

module.exports = {
    configure(app) {
        debug("configuring static content");
        let clientPath = path.join(__dirname, "../../../client");
        app.use(express.static(clientPath));
    }
};
