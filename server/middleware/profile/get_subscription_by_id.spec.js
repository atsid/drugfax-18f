"use strict";
let { expect } = require("chai");
let rewire = require("rewire");
let middleware = rewire("./get_subscription_by_id");
let persistence = require("../../persistence");
let Bluebird = require("bluebird");

describe("GetSubscriptionById Middleware", () => {
    it("emits a not authorized error if the users do not match", (done) => {
        return middleware.__with__({
            "Subscription": {
                findByIdQ: () => {
                    return Bluebird.cast({user: "1"});
                }
            }
        })(() => {
            console.log("A");
            let req = {
                user: {id: "12345"},
                params: {subscriptionId: 123}
            };
            let res = {};
            return middleware(req, res).catch((err) => {
                console.log("B");
                expect(err.httpStatus).to.equal(401);
                done();
            });
        });
    });
});
