"use strict";
let jefferson = require("express-jefferson");
let debug = require("../../../middleware/debug");

module.exports = jefferson.router({
   routes: {
       "/": {
           get: [debug.send("NotImplemented - Get Drug Adverse Events")]
       }
   }
});
