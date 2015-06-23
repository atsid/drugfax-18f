"use strict";

/**
 * Provides basic authentication methods
 */
class Authentication {

    /**
     * Returns true if the current user is logged in
     */
    isLoggedIn() {
        return false;
    }

    /**
     * Logs the current user in
     * @param {string} loginType - The type of login: ['demo', 'facebook', 'twitter']
     * @returns A promise for the login service call
     */
    login (loginType) {
        return new Promise((resolve) => {
            console.log(loginType);
            resolve();
        });
    }

    /**
     * Logs the current user out
     */
    logout() {
    }
}

module.exports = new Authentication();
