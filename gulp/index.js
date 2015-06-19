"use strict";

let fs = require("fs");
let tasks = fs.readdirSync("./gulp/tasks/");

tasks.forEach(function (task) {
    require("./tasks/" + task);
});
