"use strict";

let utils = require("../common/utils");

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
                utils.getJSON("/api/auth/current").then((res) => {
                    if (res.statusCode === 404) {
                        resolve(false);
                    } else {
                        this.user = res.body;
                        resolve(true);
                    }
                }, () => { resolve(false); });
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

                utils.postJSON("/api/users", user).then((res) => {
                    if (res.body && res.statusCode < 400) {
                        utils.postJSON("/api/auth/local", user).then((loginRes) => {
                            if (loginRes.body && loginRes.statusCode < 400) {
                                this.user = loginRes.body;
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        }, () => resolve(false));
                    } else {
                        resolve(false);
                    }
                }, () => resolve(false));
            } else {
                resolve(true);
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
