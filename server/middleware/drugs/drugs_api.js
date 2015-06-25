"use strict";
let config = require("config");
let apiFactory = require("../../components/openfda/api");
let apiKey = config.openfda && config.openfda.apiKey;
module.exports = () => apiFactory(apiKey).drugs();
