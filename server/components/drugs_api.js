"use strict";
let config = require("config");
let apiFactory = require("./openfda/api");
let apiKey = config.openfda && config.openfda.apiKey;
module.exports = () => apiFactory(apiKey).drugs();
