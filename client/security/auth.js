"use strict";
let Bluebird = require("bluebird");
let request = require("superagent-bluebird-promise");

/**
 * Provides basic authentication methods
 */
class Authentication {

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
            .catch(() => false);
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
                .catch(() => false);
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
            .catch(() => window.location.href = "/#/login");
    }
}

module.exports = new Authentication();
