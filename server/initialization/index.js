"use strict";
let debug = require("debug")("app:initialization");
const INIT_SECTIONS = [
    require("./sections/helmet"),
    require("./sections/body_parsing"),
    require("./sections/static_content"),
    require("./sections/sessions"),
    require("./sections/passport"),
    require("./sections/routing"),
    require("./sections/error_handling")
];
module.exports = {
    configure (app) {
        INIT_SECTIONS.forEach((sec) => {
            debug("configuring " + sec.name);
            sec.configure(app);
        });
    }
};
