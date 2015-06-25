"use strict";
let organizer = require("mongoose-organizer");
module.exports = mongoose => organizer.autowire("Subscription", __dirname, {mongoose: mongoose});
