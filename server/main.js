"use strict";
let http = require("http");
let config = require("config");
let debug = require("debug")("app:main");
let startupHooks = require("./startup_hooks");
let app = require("./app");

module.exports = {
    start () {
        debug("starting the application");
        let emitListeningMessage = () => console.log("server listening on port " + config.server.port);
        let startListening = () => http.createServer(app).listen(config.server.port, emitListeningMessage);
        let catchError = err => console.error("error starting application", err);
        let startupPromise = startupHooks.resolve()
            .then(startListening)
            .catch(catchError);
        return ({app, startupPromise});
    }
};
