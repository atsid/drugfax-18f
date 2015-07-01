"use strict";
let request = require("superagent-bluebird-promise");
let BaseStore = require("./base_store");

/**
 * A data store for the user profile
 */
class ProfileStore extends BaseStore {
    get() {
        return request.get("/api/profile").promise().then((res) => res.body).catch(this.errorHandler.bind(this, "Could not load your profile: "));
    }
}

module.exports = ProfileStore;
