"use strict";
let path = require("path");
let config = require("config");

module.exports = {
    name: "jade rendering",
    configure(app) {
        app.set("views", [
            path.join(__dirname, "../../../client/")
        ]);
        app.set("view engine", "jade");
        app.engine("jade", require("jade").__express);
        app.get("/index.html", (req, res) => res.render("index", config));
    }
};
