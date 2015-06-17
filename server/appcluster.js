"use strict";
let cluster = require("cluster");
let config = require("config");
let debug = require("debug")("application:clustering");

let startMaster = () => {
    let cpuCount = require("os").cpus().length;
    let workerCount = config.server.clustering.workerLimit || cpuCount;
    debug("Spawning " + workerCount + " workers");
    for (let i = 0; i < workerCount; i += 1) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        debug("worker %d died (%s). restarting...", worker.process.pid, signal || code);
        cluster.fork();
    });
};
let startApplication = () => require("./main").start();
let isClusterMaster = config.server.clustering.isEnabled && cluster.isMaster;

if (isClusterMaster) {
    startMaster();
} else {
    startApplication();
}
