"use strict";

let request = require("superagent-bluebird-promise");
let BaseStore = require("./base_store");

/**
 * A data store for the user profile
 */
class SubscriptionStore extends BaseStore {
    list(opts={}) {
        let req = request.get("/api/profile/subscriptions");
        req.query({limit: opts.limit || 25});
        req.query({skip: opts.skip || 0});
        if (opts.search) {
            req.query({search: opts.search});
        }
        return req.promise().then((res) => res.body).catch(this.errorHandler.bind(this, "Could not load your subscriptions: "));
    }

    /**
     * Retrieves a subscription by subscription ID
     * @param id
     * @returns {*|Bluebird.Promise}
     */
    get(id) {
        return request.get(`/api/profile/subscriptions/${id}`).promise().then((resp) => resp.body).catch(this.errorHandler.bind(this, "Could not get your subscription: "));
    }

    /**
     * Unsubscribes by subscription ID
     * @param id
     */
    unsubscribe(id) {
        return request.del(`/api/profile/subscriptions/${id}`).promise().catch(this.errorHandler.bind(this, "Could not unsubscribe: "));
    }

    /**
     * Subscribes to a Label set
     * @param splSetId
     * @returns {Bluebird.Promise}
     */
    subscribe(splSetId) {
        return request.post("/api/profile/subscriptions")
            .set("Content-Type", "application/json")
            .send({splSetId: splSetId})
            .promise()
            .then((res) => res.body)
            .catch(this.errorHandler.bind(this, "Could not load subscribe: "));
    }

    /**
     * Retrieves any existing subscription to a Label Set
     * @param splSetId
     * @returns {*|Promise.<T>|Bluebird.Promise}
     */
    getSubscription(splSetId) {
        return request.get("/api/profile/subscriptions")
                .query({splSetId: splSetId})
                .promise()
                .then((res) => res.body.items.length > 0 ? res.body.items[0] : null)
                .catch(this.errorHandler.bind(this, "Could not get subscription: "));
    }

    /**
     * A predicate to determine if the user is subscribed to a Label Set
     * @param splSetId
     * @returns {Promise.<T>}
     */
    isSubscribed(splSetId) {
        return this.getSubscription(splSetId).then((sub) => !!sub);
    }
}

module.exports = SubscriptionStore;
