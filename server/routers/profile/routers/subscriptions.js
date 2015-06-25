"use strict";
let jefferson = require("express-jefferson");
let profile = require("../../../middleware/profile");
let auth = require("../../../middleware/auth");

module.exports = jefferson.router({
    proxies: [require("express-jefferson/proxies/promise-handler")],
    routes: {
        /**
         * Subscription List Resource
         */
        "/": {
            get: [
                auth.assertLoggedIn,
                profile.getSubscriptions
            ],
            post: [
                auth.assertLoggedIn,
                profile.createSubscription
            ]
        },

        /**
         * DrugID - spl_set_id
         */
        "/:subscriptionId": {
            get: [
                auth.assertLoggedIn,
                profile.getSubscriptionById
            ],
            delete: [
                auth.assertLoggedIn,
                profile.deleteSubscriptionById
            ]
        }
    }
});
