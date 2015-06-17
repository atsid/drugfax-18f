"use strict";
let bodyParser = require("body-parser");

module.exports = {
    name: "body parsing",
    configure(app) {
        let regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/,
            reviveDates = (key, value) => {
                let match;
                if ((typeof value === "string") && (match = value.match(regexIso8601))) {
                    let milliseconds = Date.parse(match[0]);
                    if (!isNaN(milliseconds)) {
                        return new Date(milliseconds);
                    }
                }
                return value;
            };
        app.use(bodyParser.json({
            reviver: reviveDates
        }));
        app.use(bodyParser.urlencoded({
            extended: true
        }));
    }
};
