/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

"use strict";

var debug = require("debug")("app:persistence:seeding");

function createTestUsers(User) {
    debug("creating test users");
    return User.createQ({
        email: "chris.trevino@atsid.com",
        password: "abc123"
    });
}

let resetUsers = (User) => {
    debug("resetting users");
    return User.removeQ().then(() => createTestUsers(User));
};

let seedData = (models) => {
    debug("loading seed data");
    let User = models.User;

    return Promise.all([
        resetUsers(User)
    ]).then(() => debug("seed data populated"));
};

module.exports = {seedData};
