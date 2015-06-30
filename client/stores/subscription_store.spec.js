"use strict";
let rewire = require("rewire");
let SubscriptionStore = rewire("./subscription_store");
let MockSuperagent = require("../common.spec/mock-superagent");
let { expect } = require("chai");

describe("The Subscription Store", () => {
    let store = null;
    let agent = null;
    beforeEach(() => {
        agent = new MockSuperagent();
        SubscriptionStore.__set__("request", agent);
        store = new SubscriptionStore();
    });

    describe("list", () => {
        it("can retrieve a list of items with reasonable default paging parameters", () => {
            return store.list()
                .then(() => {
                    expect(agent.invocation.query.limit).to.equal(25);
                    expect(agent.invocation.query.skip).to.equal(0);
                });
        });

        it("allows for custom paging parameters", () => {
            return store.list({limit: 1, skip: 2})
                .then(() => {
                    expect(agent.invocation.query.limit).to.equal(1);
                    expect(agent.invocation.query.skip).to.equal(2);
                });
        });

        it("can populate search and fields queries", () => {
            return store.list({search: "abc=123", fields: "derp,herp"})
                .then(() => {
                    expect(agent.invocation.query.search).to.equal("abc=123");
                });
        });
    });

    describe("get", () => {
        it("can retrieve a subscription by id", () => {
            agent.respondWith({body: {id: 1}});
            return store.get("abc").then((resp) => {
                expect(resp.id).to.equal(1);
                expect(agent.invocation.uri).to.equal("/api/profile/subscriptions/abc");
            });
        });
    });

    describe("unsubscribe", () => {
        it("can delete a subscription", () => {
            return store.unsubscribe("abc").then(() => {
                expect(agent.invocation.method).to.equal("DELETE");
                expect(agent.invocation.uri).to.equal("/api/profile/subscriptions/abc");
            });
        });
    });

    describe("subscribe", () => {
        it("can create a subscription", () => {
            return store.subscribe("abc-123").then(() => {
                expect(agent.invocation.uri).to.equal("/api/profile/subscriptions");
                expect(agent.invocation.method).to.equal("POST");
                expect(agent.invocation.payload.splSetId).to.equal("abc-123");
            });
        });
    });

    describe("getSubscription", () => {
        it("returns null if no item could be found", () => {
            agent.respondWith({body: {items: []}});
            return store.getSubscription("abc-123").then((result) => {
                expect(agent.invocation.query.splSetId).to.equal("abc-123");
                expect(result).to.be.null;
            });
        });
        it("returns the first hhit", () => {
            agent.respondWith({body: {items: [{id: 1}]}});
            return store.getSubscription("abc-123").then((result) => {
                expect(agent.invocation.query.splSetId).to.equal("abc-123");
                expect(result.id).to.equal(1);
            });
        });
    });

    describe("isSubscribed", () => {
        it("returns false if no subscription exists", () => {
            agent.respondWith({body: {items: []}});
            return store.isSubscribed("abc-123")
                .then((result) => expect(result).to.be.false);
        });
        it("returns true if a subscription exists", () => {
            agent.respondWith({body: {items: [{id: 1}]}});
            return store.isSubscribed("abc-123")
                .then((result) => expect(result).to.be.true);
        });
    });
});
