"use strict";
let request = require("superagent-bluebird-promise");

/**
 * A data store for the user profile
 */
class ProfileStore {
    get() {
        return request.get("/api/profile").promise().then((res) => res.body);
    }
}

module.exports = ProfileStore;
