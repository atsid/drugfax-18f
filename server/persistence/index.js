"use strict";
var config = require("config"),
    fs = require("fs"),
    path = require("path"),
    seeder = require("./seed"),
    startupHooks = require("../startup_hooks");

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
    let db = config.database;

    let isComposed = () => parseInt(config.container.composed);
    let composeConnectionString = () => {
        let host = db.composeConnection.host;
        let port = db.composeConnection.port;
        let dbName = db.composeConnection.dbName;
        return `mongodb://${host}:${port}/${dbName}`;
    };
    let connectionString = isComposed() ? composeConnectionString() : db.connectionString;
    mongoose.connect(connectionString);
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

module.exports = {models};
