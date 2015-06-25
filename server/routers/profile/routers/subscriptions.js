"use strict";
let jefferson = require("express-jefferson");
let debug = require("../../../middleware/debug");

module.exports = jefferson.router({
    routes: {
        /**
         * Subscription List Resource
         */
        "/": {
            get: [debug.send("NotImplemented - Get Subscription List")],
            post: [debug.send("NotImplemented - Create Subscription")]
        },

        /**
         * DrugID - spl_set_id
         */
        "/:drugId": {
            get: [debug.send("NotImplemented - Get Subscription")],
            delete: [debug.send("NotImplemented - Delete Subscription")]
        }
    }
});
