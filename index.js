"use strict";
var config = require("config");
if (config.monitoring.newrelicKey) {
    require("newrelic");
}
require("babel/register");
require("./server/appcluster");
