"use strict";
module.exports = (config) => {
    let db = config.database;
    let isComposed = () => parseInt(config.container.composed);
    let composeConnectionString = () => {
        let host = db.composeConnection.host;
        let port = db.composeConnection.port;
        let dbName = db.composeConnection.dbName;
        return `mongodb://${host}:${port}/${dbName}`;
    };
    return isComposed() ? composeConnectionString() : db.connectionString;
};

