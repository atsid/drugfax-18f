"use strict";
let config = require("config");
let mongoose = require("mongoose-q")(require("mongoose"), {
    spread: true,
    q: require("q-bluebird")
});

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

connect();
module.exports = mongoose;
