"use strict";
let rewire = require("rewire");
let DrugStore = rewire("./drug_store");
let MockSuperagent = require("../common.spec/mock-superagent");
let { expect, assert } = require("chai");

describe("The Drug Store", () => {
    let store = null;
    let agent = null;
    beforeEach(() => {
        agent = new MockSuperagent();
        DrugStore.__set__("request", agent);
        store = new DrugStore();
    });

    it("can retrieve a drug by spl-set-id", () => {
        agent.respondWith({body: {id: "abc-123"}});
        return store.get("abc-123")
            .then((resp) => expect(resp.id).to.equal("abc-123"));
    });

    describe("list", () => {
        it("can retrieve a list of drugs with reasonable default paging parameters", () => {
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
                    expect(agent.invocation.query.fields).to.equal("derp,herp");
                });
        });
    });

    describe("listByName", () => {
        it("can retrieve a list of drugs matching a given name", () => {
            agent.respondWith({
                body: {
                    meta: {total: 100},
                    data: [
                        {id: 1}
                    ]
                }
            });
            return store.listByName("tylenol").then((result) => {
                 expect(result.data.length).to.equal(1);
                expect(result.total).to.equal(100);
            });
        });

        it("can accept overridden paging parameters", () => {
            agent.respondWith({
                body: {
                    meta: {total: 100},
                    data: [
                        {id: 1}
                    ]
                }
            });
            return store.listByName("tylenol", 50, 100).then(() => {
                expect(agent.invocation.query.skip).to.equal(50);
                expect(agent.invocation.query.limit).to.equal(100);
            });
        });
    });
});
