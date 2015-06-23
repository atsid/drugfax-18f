"use strict";
let debug = require("debug")("app:initialization");
const INIT_SECTIONS = [
    require("./sections/body_parsing"),
    require("./sections/route_rewriting"),
    require("./sections/static_content"),
    require("./sections/passport")
];
module.exports = {
    configure (app) {
        INIT_SECTIONS.forEach((sec) => {
            debug("configuring " + sec.name);
            sec.configure(app);
        });
    }
};
