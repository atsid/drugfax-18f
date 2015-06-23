"use strict";
let path = require("path");
let express = require("express");
let mountie = require("express-mountie");
let initialization = require("./initialization");

let app = express();
initialization.configure(app);
mountie({
    parent: app,
    src: path.join(__dirname, "routers"),
    prefix: (name) => (name === "root" ? "/api/" : `/api/${name}`)
});
module.exports = app;
