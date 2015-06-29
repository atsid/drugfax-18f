"use strict";
var config = require("config");
var debug = require("debug")("app:bootstrap");
if (config.monitoring.newRelicKey) {
    debug("enabling newrelic monitoring");
    require("newrelic");
}
require("babel/register");
require("./server/appcluster");
