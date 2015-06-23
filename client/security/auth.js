"use strict";

/**
 * Provides basic authentication methods
 */
class Authentication {

    /**
     * Returns true if the current user is logged in
     */
    isLoggedIn() {
        return !!this.user;
    }

    /**
     * Logs the current user in
     * @param {string} loginType - The type of login: ["demo", "facebook", "twitter"]
     * @returns A promise for the login service call
     */
    login (loginType) {
        return new Promise((resolve) => {
            if (loginType === "demo") {
                this.user = {
                    name: "Demo User"
                };
            }
            resolve();
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
