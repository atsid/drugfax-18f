"use strict";
var config = require("config"),
    fs = require("fs"),
    path = require("path"),
    seeder = require("./seed"),
    startupHooks = require("../startup_hooks");

let mongoose = require("./mongoose");
let debug = require("debug")("app:persistence");
let models = {};

/**
 * Dynamically load model types
 */
function getModels() {
    let modelNames = fs.readdirSync(path.join(__dirname, "models")),
        loadModel = (modelName) => {
            debug(`loading model ${modelName}`);
            let modelFunction = require(`./models/${modelName}`);
            debug(`preparing model ${modelName}`);
            models[modelName] = modelFunction(mongoose);
        };

    modelNames.forEach(loadModel);
}

/**
 * Populate seed data
 * @returns {*}
 */
function populateSeed() {
    if (config.database.populateSeedData) {
        debug("loading seed data");
        let seedingPromise = seeder.seedData(models);
        startupHooks.addHook(seedingPromise);
    }
}

debug("Initializing Persistence");
getModels();
populateSeed();

module.exports = {models};
