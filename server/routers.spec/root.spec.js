"use strict";
let chai = require("chai");
let expect = chai.expect;
let request = require("supertest");

describe("/api", () => {
    let app = null;
    beforeEach(() => {
        return require("./app")().then((result) => app = result);
    });

    it("is emits a root data payload", (done) => {
        request(app)
            .get("/api")
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body.status).to.equal("ok");
                done();
            });
    });
});
