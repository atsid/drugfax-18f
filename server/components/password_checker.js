"use strict";
var config = require("config");
let debug = require("debug")("app:components:password_checker");
var bcrypt = require("bcrypt");
let saltWorkFactor = config.security.password.saltWorkFactor;
let Bluebird = require("bluebird");

let doHash = Bluebird.promisify(bcrypt.hash, bcrypt);
let doSalt = Bluebird.promisify(bcrypt.genSalt, bcrypt);
let doCompare = Bluebird.promisify(bcrypt.compare, bcrypt);

let hash = (pw, salt) => doHash(pw, salt);
let genSalt = (workFactor) => doSalt(workFactor);
let compare = (password, hashed) => doCompare(password, hashed);

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
