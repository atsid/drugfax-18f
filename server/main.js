"use strict";
let http = require("http");
let path = require("path");
let config = require("config");
let debug = require("debug")("app:main");
let express = require("express");
let mountie = require("express-mountie");

require('./passport_strategies');
let startupHooks = require("./startup_hooks");
let initialization = require("./initialization");

module.exports = {
    start () {
        debug("starting the application");
        let app = express();
        let emitListeningMessage = () => console.log("server listening on port " + config.server.port);
        let startListening = () => http.createServer(app).listen(config.server.port, emitListeningMessage);
        let catchError = err => console.error("error starting application", err);
        initialization.configure(app);
        mountie({
            parent: app,
            src: path.join(__dirname, "routers"),
            prefix: (name) => (name === "root" ? "/api/" : `/api/${name}`)
        });
        let startupPromise = startupHooks.resolve()
            .then(startListening)
            .catch(catchError);
        return ({app, startupPromise});
    }
};
