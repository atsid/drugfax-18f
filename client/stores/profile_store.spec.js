"use strict";
let rewire = require("rewire");
let ProfileStore = rewire("./profile_store");
let MockSuperagent = require("../common.spec/mock-superagent");
let { expect, assert } = require("chai");

describe("The Profile Store", () => {
    let store = null;
    let agent = null;
    beforeEach(() => {
        agent = new MockSuperagent();
        ProfileStore.__set__("request", agent);
        store = new ProfileStore();
    });

    it("can retrieve the user profile", () => {
        agent.respondWith({body: {id: 1}});
        return store.get().then((profile) => {
            expect(profile.id).to.equal(1);
            expect(agent.invocation.uri).to.equal("/api/profile");
        });
    });
});
