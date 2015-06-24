"use strict";
let config = require("config");
let debug = require("debug")("app:main");
let startupHooks = require("./startup_hooks");
let server = require("./server");

module.exports = {
    start () {
        debug("starting the application");
        let emitListeningMessage = () => console.log("server listening on port " + config.server.port);
        let startListening = () => server.listen(config.server.port, emitListeningMessage);
        let catchError = err => console.error("error starting application", err);
        return startupHooks.resolve()
            .then(startListening)
            .catch(catchError);
    }
};
