"use strict";
var config = require("config");
let debug = require("debug")("app:components:password_checker");
var bcrypt = require("bcrypt");
let saltWorkFactor = config.security.password.saltWorkFactor;

let hash = (pw, salt) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pw, salt, (err, hashValue) => {
            if (err) {
                return reject(err);
            }
            resolve(hashValue);
        });
    });
};

let genSalt = (workFactor) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(workFactor, (err, salt) => {
            if (err) {
                return reject(err);
            }
            resolve(salt);
        });
    });
};

let compare = (password, hashed) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashed, (err, res) => {
            if (err) {
                reject(err);
            }
            debug((res ? "password matches" : "password does not match"));
            resolve(res);
        });
    });
};

/**
 * A predicate promise that determines if a password matches a given encrypted password
 * @param password The plain-text password entered by the client
 * @param userPassword The encrypted user password
 */
let isValidPassword = (password, hashed) => {
    if (!password) {
        throw new Error(`"password" argument is required`);
    }
    if (!hashed) {
        throw new Error(`"hashed" argument is required`);
    }
    debug("checking user password");
    return compare(password, hashed);
};

/**
 * Encrypts a password
 * @param password The password to encrypt
 */
let encryptPassword = (password) => {
    if (!password) {
        throw new Error(`"password" argument is required`);
    }
    return genSalt(saltWorkFactor).then(salt => hash(password, salt));
};

module.exports = {
    isValidPassword,
    encryptPassword
};
