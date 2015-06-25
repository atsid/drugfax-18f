"use strict";
let bodyParser = require("body-parser");
let parseDate = require("./parse_iso_8601_date");

module.exports = {
    name: "body parsing",
    configure(app) {
        let reviveDates = (key, value) => parseDate(value);
        app.use(bodyParser.json({
            reviver: reviveDates
        }));
        app.use(bodyParser.urlencoded({
            extended: true
        }));
    }
};
