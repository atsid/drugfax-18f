"use strict";
let path = require("path");
let express = require("express");

module.exports = {
    name: "static content",
    configure(app) {
        let clientPath = path.join(__dirname, "../../../client");
        app.use(express.static(clientPath));
    }
};
