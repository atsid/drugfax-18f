"use strict";
const INIT_SECTIONS = [
    require('./sections/body_parsing')
];
module.exports = {
    configure (app) {
        INIT_SECTIONS.forEach((sec) => sec.configure(app));
    }
};
