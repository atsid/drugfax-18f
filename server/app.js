"use strict";
let express = require("express");
let initialization = require("./initialization");

let app = express();
initialization.configure(app);
module.exports = app;
