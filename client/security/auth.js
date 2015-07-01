"use strict";
let Bluebird = require("bluebird");
let request = require("superagent-bluebird-promise");
let { messageTypes, messageStore } = require("../components/common/message_store");

/**
 * Provides basic authentication methods
 */
class Authentication {

    /**
     * Shows a generic service error
     * @param err The service error
     */
    _serviceError(message, err) {
        messageStore.addMessage(messageTypes.error, message + (err.message || err));
    }

    /**
     * Returns true if the current user is logged in
     */
    isLoggedIn() {
        if (this.user) {
            return Bluebird.cast(true);
        } else {
            return request.get("/api/auth/current")
            .then((res) => {
                    this.user = res.body;
                    return true;
                })
            .catch((err) => {
                if (!err.notFound) {
                    return false;
                } else {
                    this._serviceError("Could not load current user: ", err);
                    return false;
                }
            });
        }
    }

    /**
     * Logs the current user in
     * @param {string} loginType - The type of login: ["demo", "facebook", "twitter"]
     * @returns A promise for the login service call
     */
    login (loginType) {
        if (loginType === "demo") {
            var user = {
                email: "demo.account" + Math.random() + "@gmail.com",
                password: Math.random() + ""
            };
            return request.post("/api/users").send(user)
                .then(() => request.post("/api/auth/local").send(user))
                .then((loginRes) => this.user = loginRes.body)
                .then(() => true)
                .catch((err) => {
                    if (!err.notFound) {
                        return false;
                    } else {
                        this._serviceError("Could not login: ", err);
                        return false;
                    }
                });
        } else {
            window.location.href = "/api/auth/" + loginType;
        }
    }

    /**
     * Logs the current user out
     */
    logout() {
        this.user = undefined;
        return request.del("/api/auth/current")
            .then(() => window.location.href = "/#/login")
            .catch((err) => {
                 this._serviceError("Could not logout: ", err);
                 window.location.href = "/#/login";
             });
    }
}

module.exports = new Authentication();
