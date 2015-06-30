"use strict";
let config = require("config");
let getConnectionString = require("./get_connection_string");
let mongoose = require("mongoose-q")(require("mongoose"), {
    spread: true,
    q: require("q-bluebird")
});

/**
 * Initializes the MongoDB Connection
 */
function connect() {
    let connectionString = getConnectionString(config);
    mongoose.connect(connectionString);
}

connect();
module.exports = mongoose;
