"use strict";
var config = require("config"),
    fs = require("fs"),
    path = require("path"),
    seeder = require("./seed"),
    startupHooks = require("app/startup_hooks");

let mongoose = require("mongoose-q")(require("mongoose"), {
    spread: true,
    q: require("q-bluebird")
});
let debug = require("debug")("app:persistence");
let models = {};

/**
 * Initializes the MongoDB Connection
 */
function connect() {
    mongoose.connect(config.database.connectionString);
}

function disconnect() {
    mongoose.disconnect();
}

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
connect();
getModels();
populateSeed();

module.exports = {models, disconnect};
