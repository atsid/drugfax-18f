"use strict";
let http = require("http");
let app = require("./app");
module.exports = http.createServer(app);
