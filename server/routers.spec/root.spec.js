"use strict";
let chai = require("chai");
let expect = chai.expect;
let request = require("supertest");
let app = require("app/server");

describe("/api", () => {
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
