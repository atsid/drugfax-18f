"use strict";
let rewire = require("rewire");
let ManufacturerStore = rewire("./manufacturer_store");
let MockSuperagent = require("../common.spec/mock-superagent");
let { expect, assert } = require("chai");

describe("The Manufacturer Store", () => {
    let store = null;
    let agent = null;
    beforeEach(() => {
        agent = new MockSuperagent();
        ManufacturerStore.__set__("request", agent);
        store = new ManufacturerStore();
    });

    describe("list", () => {
        it("can retrieve a list of manufacturers with reasonable default paging parameters", () => {
            return store.list()
                .then(() => {
                    expect(agent.invocation.query.limit).to.equal(100);
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
                    expect(agent.invocation.query.fields).to.equal("derp,herp");
                });
        });
    });

    describe("listByName", () => {
        it("can retrieve a list of manufacturers using a name query", () => {
            agent.respondWith({
                body: {
                    data: [
                        { id: 1 }
                    ]
                }
            });
            return store.listByName("aspirin").then((res) => {
                expect(res.data.length).to.equal(1);
                expect(res.total).to.equal(1);
            });
        });

        it("can accept paging parameters", () => {
            agent.respondWith({
                body: {
                    data: [
                        { id: 1 }
                    ]
                }
            });
            return store.listByName("aspirin", 10, 100).then(() => {
                expect(agent.invocation.query.limit).to.equal(100);
                expect(agent.invocation.query.skip).to.equal(10);
            });
        });
    });

    describe("get", () => {
        it("can get a manufacturer by name", () => {
            return store.get("abc123")
                .then(() => {
                    expect(agent.invocation.query.name).to.equal("abc123");
                    expect(agent.invocation.uri).to.equal("/api/manufacturers/by-name");
                });
        });
    });
});
