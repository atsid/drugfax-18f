"use strict";
let { expect } = require("chai");
let rewire = require("rewire");
let middleware = rewire("./delete_subscription_by_id");
let Bluebird = require("bluebird");

describe("DeleteSubscriptionById Middleware", () => {
    it("emits a not authorized error if the users do not match", (done) => {
        middleware.__with__("Subscription", {
            findByIdQ: () => {
                return Bluebird.cast({user: "1"});
            }
        })(() => {
            let req = {
                user: {id: "12345"},
                params: {subscriptionId: 123}
            };
            let res = {};
            return middleware(req, res).catch((err) => {
                expect(err.httpStatus).to.equal(401);
                done();
            });
        });
    });
});
