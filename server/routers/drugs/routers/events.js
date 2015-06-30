"use strict";
let jefferson = require("express-jefferson");
let drugs = require("../../../middleware/drugs");
let cache = require("../../../middleware/cache");
module.exports = jefferson.router({
    pre: {
        all: [cache({maxAge: 3600})]
    },
   routes: {
       "/": {
           get: [drugs.events]
       }
   }
});
