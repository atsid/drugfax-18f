"use strict";
var Bluebird = require("bluebird");
let debug = require("debug")("app:startup");
let promises = [];

module.exports = {
    addHook(hook) {
        debug("adding startup hook");
        promises.push(hook);
    },

    resolve() {
        debug(`resolving ${promises.length} startup hooks`);
        return Bluebird.all(promises);
    }
};
