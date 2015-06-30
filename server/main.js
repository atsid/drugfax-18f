"use strict";
let config = require("config");
let debug = require("debug")("app:main");
let startupHooks = require("./startup_hooks");
let server = require("./server");

debug("starting the application");
let emitListeningMessage = () => console.log("server listening on port " + config.server.port);
let startListening = () => server.listen(config.server.port, emitListeningMessage);
let catchError = err => console.error("error starting application", err);

module.exports = startupHooks.resolve()
    .then(startListening)
    .then(() => server)
    .catch(catchError);
