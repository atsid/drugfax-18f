"use strict";

let request = require("superagent-bluebird-promise");

/**
 * Provides basic authentication methods
 */
class Authentication {

    /**
     * Returns true if the current user is logged in
     */
    isLoggedIn() {
        return new Promise((resolve) => {
            if (this.user) {
                resolve(true);
            } else {
                request.get("/api/auth/current").then((res) => {
                    this.user = res.body;
                    resolve(true);
                }, () => {
                    resolve(false);
                });
            }
        });
    }

    /**
     * Logs the current user in
     * @param {string} loginType - The type of login: ["demo", "facebook", "twitter"]
     * @returns A promise for the login service call
     */
    login (loginType) {
        return new Promise((resolve) => {
            if (loginType === "demo") {
                var user = {
                    email: "demo.account" + Math.random() + "@gmail.com",
                    password: Math.random() + ""
                };

                request.post("/api/users").send(user).then((res) => {
                    if (res.ok && res.body) {
                        request.post("/api/auth/local").send(user).then((loginRes) => {
                            if (loginRes.ok && loginRes.body) {
                                this.user = loginRes.body;
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        }, () => resolve(false));
                    } else {
                        resolve(false);
                    }
                }, () => {
                    resolve(false);
                });
            } else {
                window.location.href = "/api/auth/" + loginType;
            }
        });
    }

    /**
     * Logs the current user out
     */
    logout() {
        this.user = undefined;
    }
}

module.exports = new Authentication();
