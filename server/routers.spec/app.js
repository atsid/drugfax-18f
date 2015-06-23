"use strict";
let app = require("app/app");
let hooks = require("app/startup_hooks");

module.exports = () => hooks.resolve().then(() => app);
