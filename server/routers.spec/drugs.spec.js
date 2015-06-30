"use strict";
let { expect } = require("chai");
let app = require("../server");
let Session = require("supertest-session")({
    app: app
});
var nock = require("nock");

let returnDrugs = (drugs) => {
    nock("https://api.fda.gov")
        .get("/drug/label.json")
        .reply(200, {
            meta: {
                results: {
                    skip: 0,
                    limit: 1,
                    total: 72590
                }
            },
            results: drugs
        });
};

let returnDrug = (splSetId, drug) => {
    nock("https://api.fda.gov")
        .get(`/drug/label.json?search=(openfda.spl_set_id%3D%22${splSetId}%22)`)
        .reply(200, {
            meta: {
                results: {
                    skip: 0,
                    limit: 1,
                    total: 1
                }
            },
            results: [drug]
        });
};

let returnEvents = (splSetId, events) => {
    nock("https://api.fda.gov")
        .get(`/drug/event.json?search=(patient.drug.openfda.spl_set_id%3D%22${splSetId}%22)`)
        .reply(200, {
            meta: {
                results: {
                    skip: 0,
                    limit: 1,
                    total: 1
                }
            },
            results: events
        });
};

let returnEnforcements = (splSetId, enforcements) => {
    nock("https://api.fda.gov")
        .get(`/drug/enforcement.json?search=(openfda.spl_set_id%3D%22${splSetId}%22)`)
        .reply(200, {
            meta: {
                results: {
                    skip: 0,
                    limit: 1,
                    total: 1
                }
            },
            results: enforcements
        });
};

describe("/drugs", () => {
    let sess = null;
    beforeEach(() => require("../startup_hooks").resolve());
    beforeEach(() => sess = new Session());
    afterEach(() => sess.destroy());

    describe("/", () => {
        it("can retrieve drugs from the OpenFDA Drug Label service", (done) => {
            returnDrugs([{id: 123}]);
            sess.get("/api/drugs/")
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.body.data.length).to.equal(1);
                    expect(res.body.data[0].id).to.equal(123);
                    done();
                });
        });
    });

    describe("/:by-spl-set-id", () => {
        it("can retrieve a drug by spl-set-id", (done) => {
            returnDrug("abc123", {name: "aspirin"});
            sess.get("/api/drugs/by-spl-set-id/abc123")
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.body.name).to.equal("aspirin");
                    done();
                });
        });

        it("can retrieve drug enforcements", (done) => {
            returnEnforcements("abc123", [{id: "aaa"}, {id: "bbb"}]);
            sess.get("/api/drugs/by-spl-set-id/abc123/enforcements")
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.body.data.length).to.equal(2);
                    done();
                });
        });

        it("can retrieve drug events", (done) => {
            returnEvents("abc123", [{id: "aaa"}, {id: "bbb"}]);
            sess.get("/api/drugs/by-spl-set-id/abc123/events")
                .expect(200)
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.body.data.length).to.equal(2);
                    done();
                });
        });
    });
});
